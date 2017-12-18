//Check if user is admin, then send the bool to the ejs template
//No real validation, just for front-end related uses

module.exports = function (models) {
    return function (req, res, next) {
        models.user.findOne({where:{ authschId: req.user.internal_id}}).then(function (user) {
            if (user !== null && user.admin) {
                req.admin = true;
                return next();
            } else if (req.user !== null) {
               req.admin = false;
               return next();
            } else {
                res.redirect('/login');
            }
        });


    };
};