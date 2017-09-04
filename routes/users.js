var express = require('express');
var router = express.Router();

var models = require('../models');
var getUser = require('../middleware/user/getUser');


router.get('/profil/:id', getUser(models), function(req, res, next) {

    if (!req.isAuthenticated()) { res.redirect('/'); }

    res.render('pages/users/view', {userData: req.user, user: req.userProfile, active: req.active});
});

module.exports = router;
