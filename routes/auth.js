var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');
var config = require('../config.json');
var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;
var client = new pg.Client(connectionString);

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
      client.connect();
      client.query("SELECT * FROM db_user WHERE user_authsch_id = '$1'", [req.user.internal_id], function(err, result) {
      if(result.rows.length == false){ //Regisztralt?
            client.query("INSERT INTO db_user(user_name, user_authsch_id, user_avatar) values($1, $2, $3)", [req.user.displayName, req.user.internal_id, 'default.jpg']);
        }
      });

      res.redirect('/csoport/lista');
    });

module.exports = router;
