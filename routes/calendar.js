var express = require('express');
var router = express.Router();
var models = require('../models');
var getEventsForRoom = require('../middleware/calendar/getEventsForRoom');

var passport = require('passport');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/:id',  function (req, res, next) {
    console.log(req.events);
    res.render('pages/calendar');
});

router.get('/:id/event', getEventsForRoom(models), function (req, res, next) {
    console.log('inside id/event');
    res.json(req.events);
});

module.exports = router;