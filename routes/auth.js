var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

router.use('/login',
    passport.authenticate('oauth2')
);


router.use('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    }
);

router.use('/example/callback',
    function (req, res, next) {
    console.log("example callback");
        if (req.isAuthenticated()) {

            res.redirect('/');
        } else {
            return next();
        }
    },
    passport.authenticate('oauth2', {
        failureRedirect: '/auth/example'
    }),
    function (req, res) {
        res.redirect('/');
    }
);

module.exports = router;