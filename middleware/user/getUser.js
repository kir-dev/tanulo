var getUser = function (models, id){
    var getUserById = function (userId){
        return models.user.find({
            where: {
                id: userId
            }
        });
    }
    
    return function (req, res, next) {
        getUserById(req.params.id).then(function (user) {
                req.userProfile = user;
                return next();
            });
    };
};

module.exports = getUser;