var express = require('express');
var router = express.Router();
var models = require('../models');
var getEventsForRoom = require('../middleware/calendar/getEventsForRoom');
var requireAuthentication = require('../middleware/user/isAuthenticated');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(requireAuthentication);

router.get('/:id', function (req, res, next) {
    res.render('pages/calendar', {
        userData: req.user
    });
});

router.get('/:id/event', getEventsForRoom(models), function (req, res, next) {
    res.json(req.events);
});

module.exports = router;