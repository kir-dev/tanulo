var joinGroup = function (models) {
    return function (req, res, next) {
        let userPromise = models.user.findById(req.user.id);
        let groupPromise = models.group.findById(req.params.id);

        Promise.all([userPromise, groupPromise]).then(result => {
            let [user, group] = result;
            if (group.doNotDisturb) {
                return next();
            }

            group.addUser(user);
            return next();
        }).catch(err => {
            console.error(err);
            return next(new Error('Sequelize error'));
        });
    };
};

module.exports = joinGroup;