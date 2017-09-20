var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var authorizationRoutes = require('./routes/auth');
var avaliability = require('./routes/avaliability');
var group = require('./routes/group');
var help = require('./routes/help');
var settings = require('./routes/settings');
var history = require('./routes/history');
var user = require('./routes/users');
var calendar = require('./routes/calendar');

var configuration = require('./config.json');
var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2');
var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: configuration.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://auth.sch.bme.hu/site/login',
        tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
        clientID: configuration.CLIENT_ID,
        clientSecret: configuration.CLIENT_SECRET,
        callbackURL: "/auth/example/callback",
        scope: configuration.scope
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken + '\n' + refreshToken + '\n' + JSON.stringify
            (profile));
        var request = require('request');
        request('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return cb(null, JSON.parse(body), null);
            } else {
                return cb(new Error('hello'));
            }
        });
    }));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//ROUTING
app.use(function(req, res, next){
    req.active = req.path.split('/')[1] // [0] will be empty since routes start with '/'
    next();
});
app.use('/auth', authorizationRoutes);
app.use('/csoport', group);
app.use('/help', help);
app.use('/beallitasok/profil', settings);
app.use('/elozmenyek/lista', history);
app.use('/', avaliability);
app.use('/felhasznalo', user);
app.use('/tanulo', calendar);

app.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/csoport/lista');
    } else {
        res.render('login');
    }
});

//allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);

// error handlers

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
});


module.exports = app;
