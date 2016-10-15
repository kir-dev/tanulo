var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use('/login',
    passport.authenticate('oauth2'));

router.use('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });

router.use('/example/callback',
    function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('isAuth true');
            res.redirect('/');
        } else {
          console.log('isAuth false');
            return next();
        }
    },
    passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/csoport/lista');
    });

module.exports = router;
