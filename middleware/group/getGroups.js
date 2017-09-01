module.exports = function(group) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        group.group.findAll({
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