var express = require('express');
var router = express.Router();

var passport = require('passport');
var pg = require('pg');
var config = require('../config.json');
var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;

passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/', function(req, res, next) {

    if (!req.isAuthenticated()) { res.redirect('/'); }
     pg.connect(connectionString, function(err, client, done) {

        if(err) 
        {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var results = [];
        var query = client.query("SELECT group_name, group_description, group_start_date, group_end_date, subject_name " 
        	+ "FROM db_group INNER JOIN db_group_user ON db_group.group_id = db_group_user.group_id "
        	+ "INNER JOIN db_subject on db_group.subject_id = db_subject.subject_id"
        	+ "WHERE db_user.user_authsch_id = $1"
        	,[req.user.internal_id]);


        query.on('row', function(row) {
            results.push(row);
        });


        query.on('end', function() {
          res.render('pages/index', {userData: req.user, groups: results, active: req.active});
        });

    });


    res.render('pages/history', {userData: req.user, active: req.active});

});



module.exports = router;