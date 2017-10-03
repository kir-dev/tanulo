module.exports = function(models) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        models.ticket.findAll({}).then(function (tickets) {

            req.tickets = tickets;

            return next();
           
        });
    };
}