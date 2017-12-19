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
        let userPromise = findUserById(req.user.id);
        let groupPromise = findGroupById(req.params.id);

        Promise.all([userPromise, groupPromise]).then(function (result) {
            let [user, group] = result;
            if (group.doNotDisturb) {
                return next();
            }
            group.addUser(user);
            return next();
        });
    };
};

module.exports = joinGroup;