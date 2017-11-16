var express = require('express');
var router = express.Router();
var passport = require('passport');
var moment = require('moment');

var models = require('../models');

var addGroup = require('../middleware/group/addGroup');
var getGroups = require('../middleware/group/getGroups');
var getGroup = require('../middleware/group/getGroup');
var joinGroup = require('../middleware/group/joinGroup');

passport.authenticate('oauth2', {
    failureRedirect: '/auth/example'
});

router.get('/lista', getGroups(models), function (req, res, next) {
    res.render('pages/index', {
        userData: req.user,
        groups: req.group,
        moment: moment
    });
});

router.get('/nezet/:id', getGroup(models), function (req, res, next) {
    res.render('pages/groups/view', {
        userData: req.user,
        group: req.group,
        moment: moment
    });
});

router.get('/uj', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }
    
    res.render('pages/groups/new', {
        userData: req.user
    });
});

router.post('/add', addGroup(models));

router.post('/csatlakozas/:id', joinGroup(models, function (req, res, next) {
    res.redirect('/csoport/nezet/' + req.params.id);
}));

module.exports = router;