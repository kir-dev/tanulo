var express = require('express');
var router = express.Router();

var passport = require('passport');
//var pg = require('pg');
//var config = require('../config.json');
//var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;

passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/', function(req, res, next) {

    if (!req.isAuthenticated()) { res.redirect('/'); }

    res.render('pages/history', {userData: req.user});

});



module.exports = router;
