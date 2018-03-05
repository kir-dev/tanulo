var getGroups = function (models) {
    var getAllGroups = function () {
        return models.group.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
    };

    return function (req, res, next) {
        console.log(req.user);
        getAllGroups().then(function (groups) {
            req.group = groups;

            return next();
        });
    };
};

module.exports = getGroups;