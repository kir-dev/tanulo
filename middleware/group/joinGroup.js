var joinGroup = function (models) {
    let findUserById = function (userId) {
        return models.user.findOne({
            where: {
                authschId: userId
            }
        });
    };

    let findGroupById = function (groupId) {
        return models.group.findById(groupId);
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        let userPromise = findUserById(req.user.internal_id);
        let groupPromise = findGroupById(req.params.id);

        Promise.all([userPromise, groupPromise]).then(function (result) {
            let [user, group] = result;
            group.addUser(user);
            return next();
        });
    };
};

module.exports = joinGroup;