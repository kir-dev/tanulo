var express = require('express');
var router = express.Router();

var pg = require('pg');	
var connectionString = process.env.DATABASE_URL || 'postgres://felhnev:jelszo@localhost:5432/tanulo';	


/* GET HOMEPAGE */
router.get('/', function(req, res, next) {

    var results = [];	

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) { 

       
        if(err) {
          done();
          console.log(err);	
          return res.status(500).json({ success: false, data: err}); 
        }

        // SQL Query
        var query = client.query("SELECT * FROM users ORDER BY user_ID ASC;");


        query.on('row', function(row) {
            results.push(row); //a sor tartalmat push-oljuk a results tombbe
        });

      
        query.on('end', function() {
          done(res.render('pages/index', {data: results}) );	
          return results;
        });

    });

});


module.exports = router;
