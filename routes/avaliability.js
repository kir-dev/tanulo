var express = require('express');
var router = express.Router();

var models = require('../models');

var getAvaliableRooms = require('../middleware/avaliability/getAvaliableRooms');

router.get('/', getAvaliableRooms(models), function (req, res, next) {
        res.render('login', {
                userData: req.user,
                groups: req.groups
        });
});

module.exports = router;