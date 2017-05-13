var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');
//var pg = require('pg');
//var config = require('../config.json');
//var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;
//var client = new pg.Client(connectionString);

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
      // Sikeres azonositas

      models.user.findOrCreate({
        where: {authschId: req.user.internal_id},
         defaults: {
           name: req.user.displayName,
           avatar: 'default.jpg'
         }
      }).then(function(){
        res.redirect('/csoport/lista');

      }).catch(function(error){
        res.status(404).send(error);
      });


    });

module.exports = router;
