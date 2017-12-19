var getBusyRooms = function (models) {
    
        var findAllBusyRooms = function () {
            var currTime = new Date();
    
            return models.group.findAll({
                where: {
                    $and: [{
                            startDate: { lt: currTime }
                        },
                        {
                            endDate: { gt: currTime }
                        }
    
                    ]
                }
            });
        };
    
        return function (req, res, next) {
            findAllBusyRooms().then(function (groups) {
                req.groups = groups;
                return next();
            });
        };
    };
    
    module.exports = getBusyRooms;