var express = require('express');
var router = express.Router();
var models = require('../models');

var passport = require('passport');
var pg = require('pg');
var config = require('../config.json');
var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;


passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/lista', function(req, res, next) {

    if (!req.isAuthenticated()) { res.redirect('/'); }
    models.Group.findAll({
      order: [
        ['name', 'ASC']
      ]
    }).then(function(groups){
      res.render('pages/index', {userData: req.user, groups: groups, active: req.active } );
    });



});
router.get('/nezet/:id', function(req, res, next) {

  if (!req.isAuthenticated()) { res.redirect('/'); }
  var results = [];

  pg.connect(connectionString, function(err, client, done) {

      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }
     var query = client.query("SELECT * FROM db_group JOIN db_subject ON db_group.subject_id=db_subject.subject_id AND db_group.group_id = " + req.params.id + "");


      query.on('row', function(row) {
          results.push(row);
      });


      query.on('end', function() {
        res.render('pages/groups/view', {userData: req.user, group_history: results, active: req.active});
      });

  });

});
router.get('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    var results = [];
    pg.connect(connectionString, function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM db_subject;");


        query.on('row', function(row) {
            results.push(row);
        });


        query.on('end', function() {
          res.render('pages/groups/new', {userData: req.user, subjects: results, active: req.active});
        });
      });
});

router.post('/add', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }

        pg.connect(connectionString, function(err, client, done) {

            if(err) {
              done();
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }
            client.query("INSERT INTO db_group(group_name, group_description, group_start_date, group_end_date, subject_id) values($1, $2, $3, $4, $5) RETURNING group_id", [req.body.name, req.body.description, req.body.start_date, req.body.end_date, req.body.subject],
            function(err, result) {
              if(err){
                console.log(err);
              } else {
                client.query("SELECT * FROM db_user WHERE user_authsch_id = '$1'", [req.user.internal_id], function(err, user_result) {
                  if(err){
                    console.log(err);
                  } else {
                      client.query("INSERT INTO db_group_user(group_id, user_id, join_time) VALUES($1, $2, $3)", [result.rows[0].group_id, user_result.rows[0].user_id, new Date().toUTCString()]);
                  }
                });
              }
            });
          });
  res.redirect('/csoport/lista');
});



module.exports = router;
