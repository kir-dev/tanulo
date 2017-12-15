var createTicket = function (models) {
    return function (req, res, next) {
        models.ticket.create({
            roomNumber: req.body.roomNumber,
            description: req.body.description
        }).then(function () {
            return next();
        });
    };
};

module.exports = createTicket;