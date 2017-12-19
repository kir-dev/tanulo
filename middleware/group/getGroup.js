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
        findGroupById(req.params.id).then(function (group) {
            req.group = group;
            return next();
        });
    };
};

module.exports = getGroup;