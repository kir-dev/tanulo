var getGroup = function (models, id) {
    var findGroupById = function (id) {
        return models.group.find({
            where: {
                id: id
            },
            include: [models.user]
        });
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }
        
        findGroupById(req.params.id).then(function (group) {
            req.group = group;
           console.log(group);
            return next();
        });
    };
};

module.exports = getGroup;