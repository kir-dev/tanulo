var addGroup = function (models) {
    var createGroup = function (groupDTO) {
        let dnd = false;
        if(groupDTO.doNotDisturb === "true"){
            dnd = true;
        }
        return models.group.create({
            name: groupDTO.name,
            subject: groupDTO.subject,
            description: groupDTO.description,
            startDate: groupDTO.start_date,
            endDate: groupDTO.end_date,
            room: groupDTO.room,
            doNotDisturb: dnd
        });
    };

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        createGroup(req.body).then(function () {
            return next();
        });
    };
};

module.exports = addGroup;