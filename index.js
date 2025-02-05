'use strict'
require('dotenv').config();
var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');
const express = require('express')
var app = express();
const cookieParser = require('cookie-parser');

const registerUser      = require('./src/register-account');
const authenticate      = require('./src/authenticate');
const saveBlog          = require('./src/store-blog');
const getBlogByid       = require('./src/get-blog-by-id');
const getRecentBlogs    = require('./src/get-recent-blogs');
const updateProfile =  require('./src/updateprofile');
const {getmyblogs, getlikedblogs, getComments} =  require('./src/getmyinfo');

// config
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))

// middleware
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years (milliseconds)
        expires: false, // (optional) session never expires
    },
}));

// Error-handling middleware for PayloadTooLargeError
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        console.error('Payload too large:', err);
        return res.status(413).json({
            error: 'Payload Too Large',
            message: 'The request payload exceeds the server limit. Please reduce the payload size and try again.',
        });
    }
    // For other types of errors, delegate to the default error handler
    next(err);
});

// Session-persisted message middleware
app.use(function (req, res, next) {
    res.locals.isLoggedIn = false;
    if (req.session.user) {
        res.locals.isLoggedIn = true;
        res.locals.username = req.session.user.name;
    }

    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});



// ========================================================================
// ========= restrict will redirect the user if his not loged in ==========
// ========================================================================
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/signin');
    }
}



// ============================================================
// ========= signing in, signing up, and signing out ==========
// ============================================================
app.get('/signout', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.get('/signin', function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('registration-new');
    }
});

app.post('/signin', function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    authenticate(req.body.email, req.body.username, function (err, user) {
        if (err) return next(err)
        if (user) {
            req.session.regenerate(function (sessionErr) {
                if (sessionErr) return next(sessionErr);
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.email;
                return res.redirect('/');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' +
                ' email and password.';
            res.redirect('/signin');
        }
    });
});


// ============================================================
// ======================= home page ==========================
// ============================================================
app.get(['/explore', '/', 'home'], function (req, res) {
    if (req.session.user) {
        res.cookie('_ID', req.session.user.id, {
            httpOnly: false, // Cookie is accessible only by the server
            secure: false, // Set to `true` in production if using HTTPS
            maxAge: 100 * 1000 * 60 * 60 * 24, // 100 day in milliseconds
        });
    } else {
        res.redirect('/signin');
    }

    res.render('competition-selection');
});




// ============================================================
// ================== create blog page ========================
// ============================================================
app.get('/create', restrict, function (req, res) {
    res.render('create');
});

app.post('/create', restrict, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const blogID = saveBlog(req.body, req.session.user.id)

    if (blogID) {
        res.send({ blogID: blogID });
    } else {
        return res.sendStatus(400);
    }
});



// ============================================================
// ================== view a blog page ========================
// ============================================================
app.get('/view', function (req, res) {
    res.render('blog');
});

app.post('/view', function (req, res) {
    console.log(req.body)
    if (!req.body) return res.sendStatus(400);
    getBlogByid(req.body.id, res);
});


// ============================================================
// ====================== get recent blogs =====================
// ============================================================
app.post('/recentblogs', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    getRecentBlogs(req.body.page, res);
});


// ============================================================
// ====================== search page =========================
// ============================================================
app.get('/search', function (req, res) {
    res.render('search');
});



// ============================================================
// ====================== topic page =========================
// ============================================================
app.get('/topic', function (req, res) {
    res.render('topic');
});

// ============================================================
// ====================== profile page ========================
// ============================================================
app.get('/profile', restrict, function (req, res) {
    res.render('profile');
});

app.get('/myblogs', restrict, function (req, res) {
    getmyblogs(req.session.user.id, res);
});

app.get('/mylikedblogs', restrict, function (req, res) {
    getlikedblogs(req.session.user.id, res);
});

app.get('/mycomments', restrict, function (req, res) {
    getComments(req.session.user.id, res);
});

app.post('/editprofile', restrict, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    authenticate(req.session.user.email, req.body.currentpassword, function (err, user) {
        if (err) return next(err)
        if (user) {
            console.log(req.body)
            updateProfile(req.session.user.id, req.body, req);
            res.redirect("/profile")
        } else {
            req.session.error = 'Authentication failed, please check your password.';
                res.redirect("/profile")
        }
    });

});



/* istanbul ignore next */
if (!module.main) {
    app.listen(3000);
    console.log('Express started on port 3000');
}