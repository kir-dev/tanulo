var getEventsForRoom = function (models) {
    
    var getGroupForRoom = function (roomId) {
        return models.group.findAll({
            where: {
                room: roomId
            }
        });
    };

    return function (req, res, next) {
        getGroupForRoom(req.params.id).then(function (groups) {
            var eventsArray = [];

            groups.forEach(function (group) {
                eventsArray.push({
                    title: group.name,
                    start: group.startDate,
                    end: group.endDate,
                    groupId: group.id
                });
            });
            
            req.events = eventsArray;
            return next();
        });
    };
};

module.exports = getEventsForRoom;