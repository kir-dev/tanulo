var express = require('express');
var router = express.Router();
var models = require('../models');
var getTickets = require('../middleware/ticket/getTickets');
var passport = require('passport');

passport.authenticate('oauth2', {failureRedirect: '/auth/example'}),
router.get('/lista', getTickets(models), function (req, res, next) {	
	res.render('pages/tickets/view', {userData: req.user, tickets: req.tickets, active: req.active});
});
router.get('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }

    var results = [];

    res.render('pages/tickets/new', {userData: req.user, subjects: results, active: req.active});

});
router.post('/uj', function(req, res, next) {
    if (!req.isAuthenticated()) { res.redirect('/'); }
    models.ticket.create({
    	roomNumber: req.body.roomNumber,
        description: req.body.description
    }).then(function(){
      res.redirect('/hibajegyek/lista');
    }).catch(function(error){

      res.status(404).send("Invalid data");
    });


});


module.exports = router;