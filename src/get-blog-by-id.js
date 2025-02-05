const fs = require('fs');
const path = require('path');




function getBlogByid(id, res) {
    const blogFilePath = path.join(__dirname, `../database/blogs/${id}.json`); // Path for new blogs's file
    const blogsFilePath = path.join(__dirname, '../database/blogs/blogs.json'); // Path to blogs.json
    let blogsJSON;
    try {
        const blogsData = fs.readFileSync(blogsFilePath, 'utf8');
        blogsJSON = JSON.parse(blogsData); // Parse the JSON
    } catch (err) {
        res.sendStatus(400);
        return err; // unexpected error
    }
    var blogIndex = blogsJSON["blogs-ids"].indexOf(id);
    if (blogIndex == -1) {
        res.sendStatus(400);
    }

    let blogJSON;
    try {
        const blogData = fs.readFileSync(blogFilePath, 'utf8');
        blogJSON = JSON.parse(blogData); // Parse the JSON
    } catch (err) {
        res.sendStatus(400);
        return err; // unexpected error
    }

    const userFilePath = path.join(__dirname, `../database/users/${blogJSON.userid}.json`); // Path for new blogs's file

    let userJSON;
    try {
        const userData = fs.readFileSync(userFilePath, 'utf8');
        userJSON = JSON.parse(userData); // Parse the JSON
    } catch (err) {
        res.sendStatus(400);
        return err; // unexpected error
    }

    
    res.send({
        authorinfo: userJSON,
        blogInfo: blogJSON
    });
}

module.exports = getBlogByid;