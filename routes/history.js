var express = require('express');
var router = express.Router();

var passport = require('passport');

passport.authenticate('oauth2', {
    failureRedirect: '/auth/example'
});

router.get('/', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }

    res.render('pages/history', {
        userData: req.user
    });
});

module.exports = router;