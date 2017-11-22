var deleteTicket = function (models) {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }


        models.user.find({
                where: {
                    authschId: req.user.internal_id
                },
            include: [models.userRole]
            }).then(function (user) {
            if(user.userRole !== "admin"){
                res.redirect('/');
            }
        });
            
        
        models.ticket.deleteById({
            id: req.params.id
        }).then(function () {
            return next();
        });
    };
};

module.exports = createTicket;
