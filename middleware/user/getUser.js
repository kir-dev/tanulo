module.exports = function(models, id) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        models.user.find({ where: {id: req.params.id} })
            .then(function (user) {

            req.userProfile = user;

            return next();
        });
    };
};
