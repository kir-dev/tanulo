var express = require('express');
var router = express.Router();

var passport = require('passport');
var pg = require('pg');

passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/sugo', function(req, res, next) {

    if (!req.isAuthenticated()) { res.redirect('/'); }
    res.render('pages/help', {userData: req.user, active: req.active});

});



module.exports = router;
