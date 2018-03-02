var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')();

router.post('/login',
    passport.authenticate('oauth2')
);

router.get('/example/callback',
    passport.authenticate('oauth2', {
        failureRedirect: '/auth/login'
    }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;