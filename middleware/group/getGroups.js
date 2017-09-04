module.exports = function(models) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        models.group.findAll({
            order: [
                ['name', 'ASC']
            ]
        }).then(function (groups) {

            req.group = groups;

            return next();
           //
        });
    };
}