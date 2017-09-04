var express = require('express');
var router = express.Router();
var models = require('../models');
var getGroups = require('../middleware/group/getGroups');
var getGroup = require('../middleware/group/getGroup');
var passport = require('passport');

passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/lista', getGroups(models), function (req, res, next) {

    res.render('pages/index', {userData: req.user, groups: req.group, active: req.active});
});

router.post('/csatlakozas', function (req, res, next) {

    Object.keys(req.body).map(function(objectKey, index) {
        var value = req.body[objectKey];
        if(value=='on') {
            models.user.findAll({
                where: {authschId: req.user.internal_id}
            }).then(function (user) {
                models.group.findById(objectKey)
                    .then(function (group) {
                        group.addUser(user);
                    });
            });
        }

        //TODO join group

        res.redirect("/csoport/lista");
    });

});

router.get('/nezet/:id', getGroup(models), function(req, res, next) {

  if (!req.isAuthenticated()) { res.redirect('/'); }

        res.render('pages/groups/view', {userData: req.user, group: req.group, active: req.active});
});

router.get('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }

    var results = [];

          res.render('pages/groups/new', {userData: req.user, subjects: results, active: req.active});

});

router.post('/add', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    models.group.create({
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
