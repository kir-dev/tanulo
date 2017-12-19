var express = require('express');
var router = express.Router();

var requireAuthentication = require('../middleware/user/isAuthenticated');

router.use(requireAuthentication);

router.get('/', function (req, res, next) {
    res.render('pages/settings', {
        userData: req.user
    });
});

module.exports = router;