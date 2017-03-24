var express = require('express');
var router = express.Router();
var models =  require('../models');


var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://felhnev:jelszo@localhost:5432/tanulo';


/* GET HOMEPAGE */
router.get('/', function(req, res, next) {

    var results = [];

    

});

router.get('/settings', function(req, res, next) {
  res.render('pages/settings');
}


module.exports = router;
