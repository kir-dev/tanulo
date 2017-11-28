var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var moment = require('moment');
require('dotenv').config();

var authorizationRoutes = require('./routes/auth');
var rooms = require('./routes/rooms');
var groups = require('./routes/groups');
var settings = require('./routes/settings');
var history = require('./routes/history');
var user = require('./routes/users');
var tickets = require('./routes/tickets');

var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2');
var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://auth.sch.bme.hu/site/login',
        tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/example/callback",
        scope: JSON.parse(process.env.SCOPE)
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken + '\n' + refreshToken + '\n' + JSON.stringify(profile));
        var request = require('request');
        request('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return cb(null, JSON.parse(body), null);
            } else {
                return cb(new Error('hello'));
            }
        });
    }));


app.use(function (req, res, next) {
    res.locals.logged_in = req.isAuthenticated();
    res.locals.active = req.path.split('/')[1];
    console.log(res.locals.active);
    next();
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//ROUTING
app.use('^/$', function (req, res) {
    res.redirect('/tanuloszobak');
});
app.use('/tanuloszobak', rooms);
app.use('/auth', authorizationRoutes);
app.use('/csoportok', groups);
app.use('/felhasznalo', user);
app.use('/beallitasok', settings);
app.use('/elozmenyek', history);
app.use('/hibajegyek', tickets);
app.use('*', function (req, res) {
    res.render('pages/errors/not-found');
});

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err.message);
    console.log(err.stack);
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        err.status = err.status || 500;
        res.render('pages/errors/error', {
            development: true,
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/errors/error', {
            development: false,
        });
    });
}


module.exports = app;