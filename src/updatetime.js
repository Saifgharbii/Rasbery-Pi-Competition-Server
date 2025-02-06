const fs = require("fs");
const path = require("path");
const save_user_data = require("./save_user_data");

async function updatetime(req, quiz) {
  if (req.session.user["quizs"][quiz]["starting_time"] == 0) {
    req.session.user["quizs"][quiz]["starting_time"] = new Date();

    await save_user_data(req);
  }
}

module.exports = updatetime;
