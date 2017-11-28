var express = require('express');
var router = express.Router();
var moment = require('moment');

var models = require('../models');

var addGroup = require('../middleware/group/addGroup');
var getGroups = require('../middleware/group/getGroups');
var getGroup = require('../middleware/group/getGroup');
var joinGroup = require('../middleware/group/joinGroup');

var requireAuthentication = require('../middleware/user/isAuthenticated');

router.use(requireAuthentication);

router.get('/', getGroups(models), function (req, res) {
    res.render('pages/study-groups/study-groups', {
        userData: req.user,
        groups: req.group,
        moment: moment
    });
});

router.get('/uj', function (req, res) {
    res.render('pages/study-groups/new', {
        userData: req.user,
        start: Number(req.query.start),
        end: Number(req.query.end),
        roomId: req.query.roomId,
        moment: moment
    });
});

router.post('/uj', addGroup(models), function (req, res) {
    res.redirect('/csoportok');
});

router.get('/:id', getGroup(models), function (req, res) {
    res.render('pages/study-groups/view', {
        userData: req.user,
        group: req.group,
        moment: moment
    });
});

router.post('/:id/csatlakozas', joinGroup(models), function (req, res) {
    res.redirect('/csoportok/' + req.params.id);
});

module.exports = router;