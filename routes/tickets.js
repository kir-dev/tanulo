var express = require('express');
var router = express.Router();
var passport = require('passport');
var moment = require('moment');

var models = require('../models');
var requireAuthentication = require('../middleware/user/requireAuthentication');
var requireAdmin = require('../middleware/user/requireAdmin');
var getTickets = require('../middleware/ticket/getTickets');
var createTicket = require('../middleware/ticket/createTicket');
var deleteTicket = require('../middleware/ticket/deleteTicket');

router.use(requireAuthentication);

router.get('/', getTickets(models), function (req, res) {
    res.render('pages/tickets/view', {
        userData: req.user,
        admin: req.user.admin,
        tickets: req.tickets,
        active: req.active,
        moment: moment
    });
});

router.get('/uj', function (req, res) {
    res.render('pages/tickets/new', {
        userData: req.user,
        active: req.active
    });
});

router.post('/uj', createTicket(models), function (req, res) {
    res.redirect('/hibajegyek');
});

router.get('/delete/:id', requireAdmin(), deleteTicket(models), function (req, res) {
    res.redirect('/hibajegyek');
});

module.exports = router;