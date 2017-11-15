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
var avaliability = require('./routes/avaliability');
var group = require('./routes/group');
var help = require('./routes/help');
var settings = require('./routes/settings');
var history = require('./routes/history');
var user = require('./routes/users');
var calendar = require('./routes/calendar');
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
app.use('/auth', authorizationRoutes);
app.use('/csoport', group);
app.use('/help', help);
app.use('/beallitasok/profil', settings);
app.use('/elozmenyek/lista', history);
app.use('/', avaliability);
app.use('/felhasznalo', user);
app.use('/tanulo', calendar);
app.use('/hibajegyek', tickets);

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("404 happened here tesa!");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

process.on("uncaughtException", function (err) {
    console.log("UncaughtException:");
    console.log(err);
    console.log(err.stack);
});

module.exports = app;