"use strict";
require("dotenv").config();
var path = require("path");
var session = require("express-session");
const express = require("express");
var app = express();
const cookieParser = require("cookie-parser");

const authenticate = require("./src/authenticate");
const updatetime = require("./src/updatetime");
const ai_challenges = require("./src/challengs_ai");
const ras_challenges = require("./src/challengs_ras");
const cyber_challenges = require("./src/challengs_cyber");

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

  res.render("competition-selection");
});

app.get("/submission-form-security", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
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
  await updatetime(req, "ai");

  res.render("submission-form-ai", {
    duration_ai: req.session.user.quizs.ai.duration_in_m,
    start_time_ai: req.session.user.quizs.ai.starting_time,
  });
});

/* istanbul ignore next */
if (!module.main) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
