var addGroup = function (models) {
    var createGroup = function (groupDTO) {
        let dnd = false;
        if(groupDTO.doNotDisturb){
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
        createGroup(req.body).then(function (err) {
            if(err){
                //TODO error handling
                //console.log(err);    
            }
            return next();
        });
    };
};

module.exports = addGroup;