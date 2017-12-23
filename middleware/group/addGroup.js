var addGroup = function (models) {
    var createGroup = function (groupDTO, id) {

        //Check conflicts
        return models.group.findOne({
            where: {
                $and: [{
                    id: groupDTO.id
                }, {
                    $or: [{
                            $and: [{
                                    startDate: {
                                        lt: groupDTO.end_date
                                    }
                                },
                                {
                                    endDate: {
                                        gt: groupDTO.end_date
                                    }
                                }
                            ]
                        },
                        {
                            $and: [{
                                    startDate: {
                                        lt: groupDTO.start_date
                                    }
                                },
                                {
                                    endDate: {
                                        gt: groupDTO.start_date
                                    }
                                }
                            ]
                        }
                    ]
                }]
            }

        }).then(function (event) {
            if (event !== null) {
                throw new Error('Time conflict');
            }

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
                ownerId: id,
                doNotDisturb: dnd
            });
        });
    };

    return function (req, res, next) {
        createGroup(req.body, req.user.id).then(function () {

            return next();
        }).catch(function (error) {
            if (error.message === 'Time conflict') {
                res.status('401').send({
                    error: error.message
                });
                return;
            }

            throw error;
        });
    };
};

module.exports = addGroup;