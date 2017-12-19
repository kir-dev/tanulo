var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

router.use('/login',
    passport.authenticate('oauth2'));

router.use('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    }
);

router.use('/example/callback',
    function (req, res, next) {
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
    console.log(req.user);
        // Sikeres azonositas
        models.user.findOrCreate({
            where: {
                authschId: req.user.internal_id
            },
            defaults: {
                name: req.user.displayName,
                email: req.user.email,
                roomNumber: req.user.roomNumber,
                avatar: 'default.jpg',
                admin: false
            }
        }).then(function () {
            res.redirect('/');

        }).catch(function (error) {
            res.status(404).send(error);
        });
    }
);

module.exports = router;