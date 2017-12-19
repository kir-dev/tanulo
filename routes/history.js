var express = require('express');
var router = express.Router();

var requireAuthentication = require('../middleware/user/requireAuthentication');

router.use(requireAuthentication);

router.get('/', function (req, res, next) {
    res.render('pages/history', {
        userData: req.user
    });
});

module.exports = router;