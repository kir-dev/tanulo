var getGroups = function (models) {
    var getAllGroups = function () {
        return models.group.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
            return;
        }
        
        getAllGroups().then(function (groups) {
            req.group = groups;

            return next();
        });
    };
};

module.exports = getGroups;