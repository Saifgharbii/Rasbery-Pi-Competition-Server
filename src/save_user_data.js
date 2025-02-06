const fs = require("fs");
const path = require("path");

async function save_user_data(req) {
  email = req.session.user.email;

  const userFilePath = path.join(
    __dirname,
    "../database/users/" + email + ".json"
  );

  await fs.writeFileSync(
    userFilePath,
    JSON.stringify(req.session.user, null, 2)
  );
}

module.exports = save_user_data;
