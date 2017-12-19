var express = require('express');
var router = express.Router();

var models = require('../models');

var getBusyRooms = require('../middleware/studyRooms/getBusyRooms');
var getEventsForRoom = require('../middleware/studyRooms/getEventsForRoom');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', getBusyRooms(models), function (req, res, next) {
    res.render('pages/study-rooms/study-rooms', {
        userData: req.user,
        groups: req.groups
    });
});

router.get('/:id', function (req, res, next) {
        res.render('pages/study-rooms/study-room-calendar', {
            userData: req.user
        });
    });

router.get('/:id/event', getEventsForRoom(models), function (req, res, next) {
    res.json(req.events);
});

module.exports = router;