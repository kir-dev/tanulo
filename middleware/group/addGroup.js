var addGroup = function (models) {
    var createGroup = function (groupDTO, res, next) {

        //Check conflicts
        models.group.findOne({
            where: {
                $or: [
                    {
                        $and: [
                            {
                                startDate: {lt: groupDTO.end_date}
                            },
                            {
                                endDate: {gt: groupDTO.end_date}
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                startDate: {lt: groupDTO.start_date}
                            },
                            {
                                endDate: {gt: groupDTO.start_date}
                            }]
                    }]
            }

        }).then(function (event) {
            if(event !== null){
                res.status('401').send({error:' A megadott idopontban mar foglalt a tanulo'});
            }
        });

        let dnd = false;
        if (groupDTO.doNotDisturb) {
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
        createGroup(req.body, res, next).then(function (err) {

            return next();
        });
    };
};

module.exports = addGroup;