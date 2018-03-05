var getUser = function (models, id){
    return function (req, res, next) {
        models.user.findById(req.params.id).then(function (user) {
                req.userProfile = user;
                return next();
            });
    };
};

module.exports = getUser;