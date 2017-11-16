var getTicket = function (models) {
    var getAllTicket = function () {
        return models.ticket.findAll({});
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        getAllTicket().then(function (tickets) {
            req.tickets = tickets;
            return next();
        });
    };
};

module.exports = getTicket;