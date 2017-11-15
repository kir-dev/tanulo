var express = require('express');
var router = express.Router();
var models = require('../models');
var getGroups = require('../middleware/group/getGroups');
var getGroup = require('../middleware/group/getGroup');
var joinGroup = require('../middleware/group/joinGroup');
var passport = require('passport');
var moment = require('moment');

passport.authenticate('oauth2', {failureRedirect: '/auth/example'});
router.get('/lista', getGroups(models), function (req, res, next) {

    res.render('pages/index', {userData: req.user, groups: req.group, moment: moment});
});

router.post('/csatlakozas/:id', joinGroup(models), function (req, res, next) {
    //TODO sikeres csatlakozas nezet
    res.render('pages/index', {userData: req.user, groups: req.group, moment: moment});

});

router.get('/nezet/:id', getGroup(models), function(req, res, next) {

  if (!req.isAuthenticated()) { res.redirect('/'); }

        res.render('pages/groups/view', {userData: req.user, group: req.group, moment: moment});
});

router.get('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }

          res.render('pages/groups/new', {userData: req.user});

});

router.post('/add', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    models.group.create({
        name: req.body.name,
        subject: req.body.subject,
        description: req.body.description,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        room: req.body.room
    }).then(function(){
      res.redirect('/csoport/lista');
    }).catch(function(error){
      res.status(404).send("Invalid data");
    });


});



module.exports = router;
