const fs = require("fs");
const path = require("path");

async function updatetime(req, quiz) {
  email = req.session.user.email;
  if (req.session.user["quizs"][quiz]["starting_time"] == 0) {
    req.session.user["quizs"][quiz]["starting_time"] = new Date();

    const userFilePath = path.join(
      __dirname,
      "../database/users/" + email + ".json"
    );

    await fs.writeFileSync(userFilePath, JSON.stringify(req.session.user, null, 2));
  }
}

module.exports = updatetime;
