module.exports = function(models, id) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        models.group.find({ where: {id: req.params.id}, include: [models.user] })
            .then(function (group) {

            req.group = group;

            return next();
        });
    };
};
