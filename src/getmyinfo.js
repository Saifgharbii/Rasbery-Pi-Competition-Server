const fs = require('fs');
const path = require('path');

function getmyblogs(id, res) {
    const filePath = path.join(__dirname, `../database/users/${id}.json`); // Path for new user's file
    
    let userData;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        userData = JSON.parse(fileContent); // Parse JSON content
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        throw err;
    }

    console.log(userData)
    let blogs = [];
    userData["myblogs"].forEach(blogid => {
        const filePath = path.join(__dirname, `../database/blogs/${blogid}.json`); // Path for new user's file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        Data = JSON.parse(fileContent); // Parse JSON content
        blogs.push(Data);
    });

    res.send({blogs: blogs})
}

function getlikedblogs(id, res) {
    const filePath = path.join(__dirname, `../database/users/${id}.json`); // Path for new user's file
    
    let userData;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        userData = JSON.parse(fileContent); // Parse JSON content
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        throw err;
    }

    let blogs = [];

    userData["likedblogs"].forEach(blogid => {
        const filePath = path.join(__dirname, `../database/blogs/${blogid}.json`); // Path for new user's file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        Data = JSON.parse(fileContent); // Parse JSON content
        blogs.push(Data);
    });

    res.send({blogs: blogs})
}

function getComments(id, res) {
    const filePath = path.join(__dirname, `../database/users/${id}.json`); // Path for new user's file
    
    let userData;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        userData = JSON.parse(fileContent); // Parse JSON content
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        throw err;
    }


    res.send({comments: userData.comments})
}


module.exports = {getmyblogs, getlikedblogs, getComments};