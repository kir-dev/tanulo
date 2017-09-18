var express = require('express');
var router = express.Router();
var models = require('../models');
var getEventsForRoom = require('../middleware/calendar/getEventsForRoom');

var passport = require('passport');

router.get('/:id', getEventsForRoom(models), function (req, res, next) {
    console.log(req.events);
    res.render('pages/calendar', {data: req.events});
});

router.get('/:id/event', getEventsForRoom(models), function (req, res, next) {
    console.log('inside id/event');
    res.json(req.events);
});

module.exports = router;