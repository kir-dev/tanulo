var express = require('express');
var router = express.Router();
var models = require('../models');

var passport = require('passport');
//var pg = require('pg');
//var config = require('../config.json');
//var connectionString = "postgres://" + config.db_user  + ":" + config.db_pass +  "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;


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
/*
router.get('/nezet/:id', function(req, res, next) {

  if (!req.isAuthenticated()) { res.redirect('/'); }
  var results = [];

  pg.connect(connectionString, function(err, client, done) {

      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }
     var query = client.query("SELECT * FROM db_group JOIN db_subject ON db_group.subject_id=db_subject.subject_id ");//AND db_group.group_id = " + req.params.id + "");


      query.on('row', function(row) {
          results.push(row);
      });


      query.on('end', function() {
        res.render('pages/groups/view', {userData: req.user, group_history: results, active: req.active});
      });

  });

});*/
router.get('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    var results = [];

          res.render('pages/groups/new', {userData: req.user, subjects: results, active: req.active});

});

router.post('/add', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    models.Group.create({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.start_date,
        endDate: req.body.end_date
    }).then(function(){
      res.redirect('/csoport/lista');
    }).catch(function(error){
      res.status(404).send("Invalid data");
    });


});



module.exports = router;
