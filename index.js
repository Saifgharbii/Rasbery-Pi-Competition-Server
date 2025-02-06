"use strict";
require("dotenv").config();
var path = require("path");
var session = require("express-session");
const express = require("express");
var app = express();
const cookieParser = require("cookie-parser");

const authenticate = require("./src/authenticate");
const updatetime = require("./src/updatetime");
const ai_challenges = require("./src/challenges_ai");
const ras_challenges = require("./src/challenges_ras");
const cyber_challenges = require("./src/challenges_cyber");
const save_user_data = require("./src/save_user_data");
const calculate_score = require("./src/calculate_score");

let ras_score_board = {};
let ai_score_board = {};
let cyber_score_board = {};

// config
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years (milliseconds)
      expires: false, // (optional) session never expires
    },
  })
);

// Session-persisted message middleware
app.use(function (req, res, next) {
  res.locals.isLoggedIn = false;
  if (req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.username = req.session.user.username;
  }

  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";

  res.locals.ai_challenges = ai_challenges;

  res.locals.cyber_challenges = cyber_challenges;

  res.locals.ras_challenges = ras_challenges;

  next();
});

// ========================================================================
// ========= restrict will redirect the user if his not loged in ==========
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
// ========= signing in, signing up, and signing out ==========
// ============================================================
app.get("/signout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
});

app.get("/signin", function (req, res) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("registeration");
  }
});

app.post("/signin", function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  authenticate(req.body.email, req.body.username, function (err, user) {
    if (err) return next(err);
    if (user) {
      req.session.regenerate(function (sessionErr) {
        if (sessionErr) return next(sessionErr);
        req.session.user = user;
        req.session.success = "Authenticated as " + user.email;
        return res.redirect("/");
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " + " email and password.";
      res.redirect("/signin");
    }
  });
});

// ============================================================
// ======================= home page ==========================
// ============================================================
app.get(["/explore", "/", "home"], function (req, res) {
  if (req.session.user) {
    res.cookie("_ID", req.session.user.id, {
      httpOnly: false, // Cookie is accessible only by the server
      secure: false, // Set to `true` in production if using HTTPS
      maxAge: 100 * 1000 * 60 * 60 * 24, // 100 day in milliseconds
    });
  } else {
    res.redirect("/signin");
    return;
  }

  refreashtimersandscoreboards(req, res);
  res.render("competition-selection");
});

app.get("/submission-form-security", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  if (is_time_up_cyber(req, res)) {
    res.redirect("/result_cyber");
    return;
  }

  updatetime(req, "cyber");
  res.render("submission-form-security", {
    duration_sec: req.session.user.quizs.cyber.duration_in_m,
    start_time_sec: req.session.user.quizs.cyber.starting_time,
  });
});

app.get("/submission-form-rasbery-generalities", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  if (is_time_up_ras(req, res)) {
    res.redirect("/result_ras");
    return;
  }

  updatetime(req, "rasbari");
  res.render("submission-form-rasbery-generalities", {
    duration_ras: req.session.user.quizs.rasbari.duration_in_m,
    start_time_ras: req.session.user.quizs.rasbari.starting_time,
  });
});

app.get("/submission-form-ai", async function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  if (is_time_up_ai(req, res)) {
    res.redirect("/result_ai");
    return;
  }
  await updatetime(req, "ai");

  res.render("submission-form-ai", {
    duration_ai: req.session.user.quizs.ai.duration_in_m,
    start_time_ai: req.session.user.quizs.ai.starting_time,
  });
});

/////////////// save
app.post("/save", async function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  const referer = req.get("Referer") || req.get("Origin");

  if (
    referer.includes("submission-form-rasbery-generalities") &&
    !is_time_up_ras(req, res, 2)
  ) {
    req.session.user["quizs"]["rasbari"]["problems_solved"] = req.body["flags"];
    req.session.user["quizs"]["cyber"]["last_score"] = calculate_score(
      ras_challenges,
      req.body["flags"]
    );
    req.session.user["quizs"]["rasbari"]["score"] = Math.max(
      req.session.user["quizs"]["rasbari"]["score"],
      req.session.user["quizs"]["cyber"]["last_score"]
    );
    save_score_board_ras(req);
  } else if (
    referer.includes("submission-form-security") &&
    !is_time_up_ras(req, res, 2)
  ) {
    req.session.user["quizs"]["cyber"]["problems_solved"] = req.body["flags"];
    req.session.user["quizs"]["cyber"]["last_score"] = calculate_score(
      cyber_challenges,
      req.body["flags"]
    );
    req.session.user["quizs"]["cyber"]["score"] = Math.max(
      req.session.user["quizs"]["cyber"]["score"],
      req.session.user["quizs"]["cyber"]["last_score"]
    );
    save_score_board_cyber(req);
  } else if (
    referer.includes("submission-form-ai") &&
    !is_time_up_ras(req, res, 2)
  ) {
    req.session.user["quizs"]["ai"]["problems_solved"] = req.body["flags"];
    req.session.user["quizs"]["cyber"]["last_score"] = calculate_score(
      ai_challenges,
      req.body["flags"]
    );
    req.session.user["quizs"]["ai"]["score"] = Math.max(
      req.session.user["quizs"]["ai"]["score"],
      req.session.user["quizs"]["cyber"]["last_score"]
    );
    save_score_board_ai(req);
  }

  await save_user_data(req);
  console.log(req.session.user);

  res.status(200).send("Request was successful!");
});

app.get("/result", async function (req, res) {
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

////////////////////// results
app.get("/result_ras", async function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  is_time_up_ras(req, res);
  res.render("score-board-generalities", {
    score: req.session.user["quizs"]["cyber"]["last_score"],
    userData: Object.values(ras_score_board),
    email: req.session.user["email"],
  });
});

app.get("/result_cyber", async function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  is_time_up_cyber(req, res);
  res.render("score-board-security", {
    score: req.session.user["quizs"]["cyber"]["last_score"],
    userData: Object.values(ras_score_board),
    email: req.session.user["email"],
  });
});

app.get("/result_ai", async function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  is_time_up_ai(req, res);
  res.render("score-board-ai", {
    score: req.session.user["quizs"]["cyber"]["last_score"],
    userData: Object.values(ras_score_board),
    email: req.session.user["email"],
  });
});

//////shit timers

function is_time_up_ai(req, res, extra = 0) {
  if (req.session.user["quizs"]["ai"]["starting_time"] == 0) {
    res.locals.is_time_up_ai = false;
  } else {
    res.locals.is_time_up_ai =
      (new Date() -
        new Date(req.session.user["quizs"]["ai"]["starting_time"])) /
        (1000 * 60) +
        extra >
      req.session.user["quizs"]["ai"]["duration_in_m"];
  }
  return res.locals.is_time_up_ai;
}

function is_time_up_cyber(req, res, extra = 0) {
  if (req.session.user["quizs"]["cyber"]["starting_time"] == 0) {
    res.locals.is_time_up_cyber = false;
  } else {
    res.locals.is_time_up_cyber =
      (new Date() -
        new Date(req.session.user["quizs"]["cyber"]["starting_time"])) /
        (1000 * 60) +
        extra >
      req.session.user["quizs"]["cyber"]["duration_in_m"];
  }
  return res.locals.is_time_up_cyber;
}

function is_time_up_ras(req, res, extra = 0) {
  if (req.session.user["quizs"]["rasbari"]["starting_time"] == 0) {
    res.locals.is_time_up_ras = false;
  } else {
    res.locals.is_time_up_ras =
      (new Date() -
        new Date(req.session.user["quizs"]["rasbari"]["starting_time"])) /
        (1000 * 60) +
        extra >
      req.session.user["quizs"]["rasbari"]["duration_in_m"];
  }

  return res.locals.is_time_up_ras;
}

////////////////save score
function save_score_board_ras(req) {
  let differenceInMilliseconds =
    new Date() -
    new Date(req.session.user["quizs"]["rasbari"]["starting_time"]);
  differenceInMilliseconds = Math.min(
    req.session.user["quizs"]["rasbari"]["duration_in_m"] * 60 * 1000,
    differenceInMilliseconds
  );
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  ras_score_board[req.session.user["email"]] = {
    email: req.session.user["email"],
    username: req.session.user["username"],
    score: req.session.user["quizs"]["rasbari"]["score"],
    timeTaken: formattedTime,
  };
}
function save_score_board_ai(req) {
  let differenceInMilliseconds =
    new Date() - new Date(req.session.user["quizs"]["ai"]["starting_time"]);
  differenceInMilliseconds = Math.min(
    req.session.user["quizs"]["ai"]["duration_in_m"] * 60 * 1000,
    differenceInMilliseconds
  );

  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  const minutes = Math.floor(differenceInSeconds / 60);

  const seconds = differenceInSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  ai_score_board[req.session.user["email"]] = {
    email: req.session.user["email"],
    username: req.session.user["username"],
    score: req.session.user["quizs"]["ai"]["score"],
    timeTaken: formattedTime,
  };
}
function save_score_board_cyber(req) {
  let differenceInMilliseconds =
    new Date() - new Date(req.session.user["quizs"]["cyber"]["starting_time"]);

  differenceInMilliseconds = Math.min(
    req.session.user["quizs"]["cyber"]["duration_in_m"] * 60 * 1000,
    differenceInMilliseconds
  );

  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  const minutes = Math.floor(differenceInSeconds / 60);

  const seconds = differenceInSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  cyber_score_board[req.session.user["email"]] = {
    email: req.session.user["email"],
    username: req.session.user["username"],
    score: req.session.user["quizs"]["cyber"]["score"],
    timeTaken: formattedTime,
  };
}

function refreashtimersandscoreboards(req, res) {
  is_time_up_ras(req, res);
  is_time_up_ai(req, res);
  is_time_up_cyber(req, res);
  save_score_board_ras(req);
  save_score_board_cyber(req);
  save_score_board_ai(req);
}

/* istanbul ignore next */
if (!module.main) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
