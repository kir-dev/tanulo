var deleteTicket = function (models) {
    return function (req, res, next) {
        models.ticket.findById(req.params.id).then(function (ticket) {
            ticket.destroy();
            return next();
        });
    };
};

module.exports = deleteTicket;
