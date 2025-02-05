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

function getFormattedDate() {
    const date = new Date();

    // Array of weekday names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = weekdays[date.getDay()];

    // Get day of the month
    const day = date.getDate();

    // Array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];

    // Get the year
    const year = date.getFullYear();

    // Combine into desired format
    return `${dayName}, ${day} ${monthName} ${year}`;
}


function saveBlog(body, userId) {
    const blogsFilePath = path.join(__dirname, '../database/blogs/blogs.json'); // Path to blogs.json
    body["id"] = generateRandomId(20);
    body["userid"] = userId;
    body["publish-date"] = getFormattedDate();
    body["comments"] = [];
    body["likes"] = 0;
    const newBlogFilePath = path.join(__dirname, `../database/blogs/${body.id}.json`); // Path for new blogs's file
    const userFilePath = path.join(__dirname, `../database/users/${userId}.json`); // Path for new user's file
    

    // Reading blogs.json
    let blogsJSON;
    try {
        const blogsData = fs.readFileSync(blogsFilePath, 'utf8');
        blogsJSON = JSON.parse(blogsData); // Parse the JSON
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, initialize data
            blogsJSON = { "blogs-ids": [] };
        } else {
            return err; // unexpected error
        }
    }

    
    // Reading user.json
    let userData;
    try {
        const userJson = fs.readFileSync(userFilePath, 'utf8');
        userData = JSON.parse(userJson); // Parse the JSON
    } catch (err) {
        return err;
    }

    userData["myblogs"].push(body.id);
    blogsJSON["blogs-ids"].push(body.id);

    // Saving updated blogs.json
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogsJSON, null, 4), 'utf8');
    // Saving the new blog's data to id.json
    fs.writeFileSync(newBlogFilePath, JSON.stringify(body, null, 4), 'utf8');

    console.log(`New blog added with ID: ${body.id}`);

    return body.id;
}


module.exports = saveBlog;
