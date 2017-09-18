module.exports = function(models) {

    return function (req, res, next) {
        console.log(req.params.id);
        var currTime = new Date();
        console.log(currTime);

        models.group.findAll({
            where: {
                room : req.params.id
            }
        }).then(function (groups) {

            console.log('Getting events at room' + groups);
            var eventsArray = [];
            groups.forEach(function (group) {
                console.log('current group: ' + group);
                console.log('group owner ' + group.name);
               eventsArray.push({
                   title: group.name,
                   start: group.startDate,
                   end: group.endDate
               })
            });

            req.events = eventsArray;
            return next();
            //
        });
    };
}
