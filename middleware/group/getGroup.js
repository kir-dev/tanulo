module.exports = function(models, id) {


    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        models.group.findById(req.params.id)
            .then(function (group) {

            req.group = group;

            return next();
            //
        });
    };
}
