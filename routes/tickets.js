var express = require('express');
var router = express.Router();
var passport = require('passport');
var moment = require('moment');

var models = require('../models');
var getTickets = require('../middleware/ticket/getTickets');
var createTicket = require('../middleware/ticket/createTicket');
var deleteTicket = require('../middleware/ticket/deleteTicket');
var validateAdmin = require('../middleware/user/checkAdmin');
var checkAdmin = require('../middleware/user/validateAdmin');

var requireAuthentication = require('../middleware/user/isAuthenticated');

router.use(requireAuthentication);

router.get('/', checkAdmin(models), getTickets(models), function (req, res, next) {
    console.log("inside get route");

    console.log(req);
    res.render('pages/tickets/view', {
        userData: req.user,
        admin: req.admin,
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

router.get('/delete/:id', validateAdmin(models), deleteTicket(models), function (req, res, next) {
    res.redirect('/hibajegyek');
});

module.exports = router;