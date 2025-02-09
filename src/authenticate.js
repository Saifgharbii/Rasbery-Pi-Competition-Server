const fs = require("fs");
const path = require("path");

user_data_struct = {
  email: "",
  username: "",
  quizs: {
    cyber: { duration_in_m: 15, starting_time: 0, problems_solved: [], score:0, last_score:0 },
    ai: { duration_in_m: 15, starting_time: 0, problems_solved: [], score:0, last_score:0  },
    ras: { duration_in_m: 50, starting_time: 0, problems_solved: [], score:0, last_score:0  },
  },
};

// Authenticate using our plain-object database of doom!
function authenticate(email, usename, fn) {
  if (!module.main) console.log("authenticating %s", email);

  const userFilePath = path.join(
    __dirname,
    "../database/users/" + email + ".json"
  );

  // Reading users.json
  let userData;
  try {
    const userJson = fs.readFileSync(userFilePath, "utf8");

    userData = JSON.parse(userJson); // Parse the JSON
  } catch (err) {
    if (err.code === "ENOENT") {
      // File does not exist, create it with the default structure
      userData = user_data_struct;
      userData["email"] = email;
      userData["username"] = usename;
      try {
        fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2)); // Write the default structure to the file

        console.log(`new email "${email}"`);
      } catch (writeErr) {
        console.error("Error creating the file:", writeErr);
        return fn(null, false);
      }
    } else {
      console.error("Unexpected error:", err);

      return fn(null, false);
    }
  }

  fn(null, userData);
}

module.exports = authenticate;
