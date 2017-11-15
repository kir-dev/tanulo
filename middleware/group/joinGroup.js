
module.exports = function(models) {


    return function (req, res, next) {
        console.log("inside joinGroup");
        console.log(req.user.internal_id);

        models.user.findOne({
            where: {authschId: req.user.internal_id}
        }).then(function (user) {
            models.group.findById(req.params.id)
                .then(function (group) {
                    group.addUser(user);

                });
            return next();
        });

    };
};