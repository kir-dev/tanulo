var addGroup = function (models) {
    var createGroup = function (groupDTO) {
        return models.group.create({
            name: groupDTO.name,
            subject: groupDTO.subject,
            description: groupDTO.description,
            startDate: groupDTO.start_date,
            endDate: groupDTO.end_date,
            room: groupDTO.room
        });
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        createGroup(req.body).then(function () {
            res.redirect('/csoport/lista');
            return next();
        });
    };
};

module.exports = addGroup;