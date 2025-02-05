const fs = require('fs');
const path = require('path');
var hash = require('pbkdf2-password')()

function updateProfile(id, body, req) {
    const filePath = path.join(__dirname, `../database/users/${id}.json`); // Path for new user's file
    
    let userData;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        userData = JSON.parse(fileContent); // Parse JSON content
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        throw err;
    }

    console.log(body);

    if (body.newpassword =! "") {
        hash({
            password: body.newpassword
        }, function (err, pass, salt, hash) {
            userData.hash = hash;
            userData.salt = salt;
        });
    }
    if (body.email =! "") {
        userData.email = body.email
    }
    if (body.name =! "") {
        userData.name = body.name
    }

    req.session.user = userData;
    // Save the updated user data back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 4), 'utf8');
        console.log(`User credentials updated successfully in ${filePath}`);
    } catch (err) {
        console.error(`Error writing file at ${filePath}:`, err);
        throw err;
    }

}

module.exports = updateProfile;