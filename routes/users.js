var express = require('express');
var router = express.Router();

var models = require('../models');
var getUser = require('../middleware/user/getUser');

var requireAuthentication = require('../middleware/user/requireAuthentication');

router.use(requireAuthentication);

router.get('/:id', getUser(models), function (req, res, next) {
    res.render('pages/users/view', {
        userData: req.user,
        user: req.userProfile
    });
});

module.exports = router;