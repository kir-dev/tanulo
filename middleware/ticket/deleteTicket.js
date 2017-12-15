var deleteTicket = function (models) {
    return function (req, res, next) {
        models.ticket.deleteById({
            id: req.params.id
        }).then(function () {
            return next();
        });
    };
};

module.exports = deleteTicket;
