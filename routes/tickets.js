var express = require('express');
var router = express.Router();
var passport = require('passport');
var moment = require('moment');

var models = require('../models');
var getTickets = require('../middleware/ticket/getTickets');
var createTicket = require('../middleware/ticket/createTicket');

var requireAuthentication = require('../middleware/user/isAuthenticated');

router.use(requireAuthentication);

router.get('/', getTickets(models), function (req, res, next) {
    res.render('pages/tickets/view', {
        userData: req.user,
        tickets: req.tickets,
        active: req.active,
        moment: moment
    });
});

router.get('/uj', function (req, res, next) {
    res.render('pages/tickets/new', {
        userData: req.user,
        active: req.active
    });
});

router.post('/uj', createTicket(models), function (req, res, next) {
    res.redirect('/hibajegyek');
});

module.exports = router;