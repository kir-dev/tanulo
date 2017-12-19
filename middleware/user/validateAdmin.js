//Real admin validation for sensitive routes

module.exports = function (models) {
    return function (req, res, next) {
        models.user.findOne({where:{ authschId: req.user.internal_id}}).then(function (user) {
            if (user !== null && user.admin) {
                return next();
            } else if (req.user !== null) {
                return next(new Error('Unauthorized'));
            } else {
                res.redirect('/login');
            }
        });


    };
};
