"use strict";
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Import custom modules
const authenticate = require("./src/authenticate");
const updatetime = require("./src/updatetime");
const ai_challenges = require("./src/challenges_ai");
const ras_challenges = require("./src/challenges_ras");
const cyber_challenges = require("./src/challenges_cyber");
const save_user_data = require("./src/save_user_data");
const calculate_score = require("./src/calculate_score");

// Initialize scoreboards
let ras_score_board = {};
let ai_score_board = {};
let cyber_score_board = {};

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
  console.error("FATAL ERROR: SESSION_SECRET is not defined.");
  process.exit(1);
}

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
      expires: false,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
    },
  })
);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Session-persisted message middleware
app.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.session.user;
  if (req.session.user) {
    res.locals.username = req.session.user.username;
  }

  // Flash messages
  res.locals.message = "";
  if (req.session.error) {
    res.locals.message = `<p class="msg error">${req.session.error}</p>`;
    delete req.session.error;
  }
  if (req.session.success) {
    res.locals.message = `<p class="msg success">${req.session.success}</p>`;
    delete req.session.success;
  }

  // Pass challenges to views
  res.locals.ai_challenges = ai_challenges;
  res.locals.cyber_challenges = cyber_challenges;
  res.locals.ras_challenges = ras_challenges;

  next();
});

// ========================================================================
// ========= Middleware to restrict access to logged-in users =============
// ========================================================================
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/signin");
  }
}

// ============================================================
// ========= Authentication Routes (Signin/Signout) ===========
// ============================================================
app.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/signin", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("registeration");
  }
});

app.post("/signin", (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.username) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  authenticate(req.body.email, req.body.username, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.session.regenerate((sessionErr) => {
        if (sessionErr) return next(sessionErr);
        req.session.user = user;
        req.session.success = `Authenticated as ${user.email}`;
        res.redirect("/");
      });
    } else {
      req.session.error = "Authentication failed, please check your email and password.";
      res.redirect("/signin");
    }
  });
});

// ============================================================
// ======================= Home Page ==========================
// ============================================================
app.get(["/explore", "/", "/home"], (req, res) => {
  if (!req.session.user) {
    res.redirect("/signin");
    return;
  }

  // Set user ID cookie
  res.cookie("_ID", req.session.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
  });

  refreshTimersAndScoreboards(req, res);
  res.render("competition-selection");
});

// ============================================================
// ================== Submission Forms ========================
// ============================================================
app.get("/submission-form-security", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  if (isTimeUp(req, res, "cyber")) return res.redirect("/result_cyber");

  updatetime(req, "cyber");
  res.render("submission-form-security", {
    duration_sec: req.session.user.quizs.cyber.duration_in_m,
    start_time_sec: req.session.user.quizs.cyber.starting_time,
  });
});

app.get("/submission-form-rasbery-generalities", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  if (isTimeUp(req, res, "ras")) return res.redirect("/result_ras");

  updatetime(req, "ras");
  res.render("submission-form-rasbery-generalities", {
    duration_ras: req.session.user.quizs.ras.duration_in_m,
    start_time_ras: req.session.user.quizs.ras.starting_time,
  });
});

app.get("/submission-form-ai", async (req, res) => {
  if (!req.session.user) return res.redirect("/");
  if (isTimeUp(req, res, "ai")) return res.redirect("/result_ai");

  await updatetime(req, "ai");
  res.render("submission-form-ai", {
    duration_ai: req.session.user.quizs.ai.duration_in_m,
    start_time_ai: req.session.user.quizs.ai.starting_time,
  });
});

// ============================================================
// ================== Save User Data ==========================
// ============================================================
app.post("/save", async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  const referer = req.get("Referer") || req.get("Origin");
  const quizType = referer.includes("submission-form-rasbery-generalities")
    ? "ras"
    : referer.includes("submission-form-security")
    ? "cyber"
    : referer.includes("submission-form-ai")
    ? "ai"
    : null;

  if (quizType && !isTimeUp(req, res, quizType, 2)) {
    req.session.user.quizs[quizType].problems_solved = req.body.flags;
    req.session.user.quizs[quizType].last_score = calculate_score(
      { ras: ras_challenges, cyber: cyber_challenges, ai: ai_challenges }[quizType],
      req.body.flags
    );
    req.session.user.quizs[quizType].score = Math.max(
      req.session.user.quizs[quizType].score,
      req.session.user.quizs[quizType].last_score
    );
    saveScoreBoard(req, quizType);
  }

  await save_user_data(req);
  res.status(200).send("Request was successful!");
});

// ============================================================
// ================== Result Pages ============================
// ============================================================
app.get("/result", (req, res) => {
  const referer = req.get("Referer") || req.get("Origin");
  if (referer.includes("submission-form-rasbery-generalities")) {
    res.redirect("/result_ras");
  } else if (referer.includes("submission-form-security")) {
    res.redirect("/result_cyber");
  } else if (referer.includes("submission-form-ai")) {
    res.redirect("/result_ai");
  } else {
    res.redirect("/");
  }
});

app.get("/result_ras", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  isTimeUp(req, res, "ras");
  res.render("score-board-generalities", {
    score: req.session.user.quizs.ras.last_score,
    userData: Object.values(ras_score_board),
    email: req.session.user.email,
  });
});

app.get("/result_cyber", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  isTimeUp(req, res, "cyber");
  res.render("score-board-security", {
    score: req.session.user.quizs.cyber.last_score,
    userData: Object.values(cyber_score_board),
    email: req.session.user.email,
  });
});

app.get("/result_ai", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  isTimeUp(req, res, "ai");
  res.render("score-board-ai", {
    score: req.session.user.quizs.ai.last_score,
    userData: Object.values(ai_score_board),
    email: req.session.user.email,
  });
});

// ============================================================
// ================== Helper Functions ========================
// ============================================================
function isTimeUp(req, res, quizType, extra = 0) {
  const quiz = req.session.user.quizs[quizType];
  if (!quiz || quiz.starting_time === 0) {
    res.locals[`is_time_up_${quizType}`] = false;
    return false;
  }

  const elapsedTime = (new Date() - new Date(quiz.starting_time)) / (1000 * 60);
  res.locals[`is_time_up_${quizType}`] = elapsedTime + extra > quiz.duration_in_m;
  return res.locals[`is_time_up_${quizType}`];
}

function saveScoreBoard(req, quizType) {
  const quiz = req.session.user.quizs[quizType];
  let differenceInMilliseconds = new Date() - new Date(quiz.starting_time);
  differenceInMilliseconds = Math.min(quiz.duration_in_m * 60 * 1000, differenceInMilliseconds);

  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const scoreBoard = {
    ras: ras_score_board,
    ai: ai_score_board,
    cyber: cyber_score_board,
  }[quizType];

  scoreBoard[req.session.user.email] = {
    email: req.session.user.email,
    username: req.session.user.username,
    score: quiz.score,
    timeTaken: formattedTime,
  };
}

function refreshTimersAndScoreboards(req, res) {
  isTimeUp(req, res, "ras");
  isTimeUp(req, res, "ai");
  isTimeUp(req, res, "cyber");
  saveScoreBoard(req, "ras");
  saveScoreBoard(req, "cyber");
  saveScoreBoard(req, "ai");
}

// ============================================================
// ================== Start Server ============================
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
});