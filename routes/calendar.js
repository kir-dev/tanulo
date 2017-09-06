var express = require('express');
var router = express.Router();
var models = require('../models');
var getAvaliableRooms = require('../middleware/avaliability/getAvaliableRooms');
var passport = require('passport');

router.get('/:id', getAvaliableRooms(models), function (req, res, next) {
    res.render('pages/calendar');
});

module.exports = router;