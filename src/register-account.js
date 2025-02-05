const fs = require('fs');
const path = require('path');

// Helper function to generate a random ID of a given length
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Register user function
function generateUserInfo(username, email, hashedPassword, salt) {
    const id = generateRandomId(10); // Generate random ID

    return {
        id: id,
        name: username,
        email: email,
        hash: hashedPassword,
        salt: salt,
        avatar: "/static/assets/images/user.png",
        likedblogs: [],
        myblogs: [],
        comments: []
    };
}

function updateUserCredentials(filePath, newHashedPassword, newSalt) {
    // Step 1: Read the user file
    let userData;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        userData = JSON.parse(fileContent); // Parse JSON content
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        throw err;
    }

    // Step 2: Update the hashedPassword and salt
    userData.hash = newHashedPassword;
    userData.salt = newSalt;

    // Step 3: Save the updated user data back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 4), 'utf8');
        console.log(`User credentials updated successfully in ${filePath}`);
    } catch (err) {
        console.error(`Error writing file at ${filePath}:`, err);
        throw err;
    }

    return userData;
}

// Function to add a user and update files
function registerUser(username, email, hashedPassword, salt) {
    const newUser = generateUserInfo(username, email, hashedPassword, salt); // Generate new user
    const usersFilePath = path.join(__dirname, '../database/users/users.json'); // Path to users.json

    // Reading users.json
    let usersData;
    try {
        const usersJson = fs.readFileSync(usersFilePath, 'utf8');
        usersData = JSON.parse(usersJson); // Parse the JSON
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, initialize data
            usersData = { "user_ids": [], "emails": [] };
        } else {
            return err; // unexpected error
        }
    }

    var emailIndex = usersData.emails.indexOf(email);
    if (emailIndex == -1) {
        const newUserFilePath = path.join(__dirname, `../database/users/${newUser.id}.json`); // Path for new user's file
        // Adding the new user ID
        usersData["user_ids"].push(newUser.id);
        usersData["emails"].push(newUser.email);

        // Saving updated users.json
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 4), 'utf8');
        // Saving the new user's data to id.json
        fs.writeFileSync(newUserFilePath, JSON.stringify(newUser, null, 4), 'utf8');

        console.log(`New user added with ID: ${newUser.id}`);
    } else {
        const newUserFilePath = path.join(__dirname, `../database/users/${usersData["user_ids"][emailIndex]}.json`); // Path for new user's file
        try {
            UpdateduserData = updateUserCredentials(newUserFilePath, newUser.hash, newUser.salt);
        } catch (err) {
            return err; // unexpected error
        }
        console.log(`User ${newUser.email} has updated his password.`);
        return UpdateduserData;
    }

    return newUser;
}

module.exports = registerUser;