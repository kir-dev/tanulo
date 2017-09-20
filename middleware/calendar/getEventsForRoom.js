module.exports = function(models) {

    return function (req, res, next) {




        models.group.findAll({
            where: {
                room : req.params.id
            }
        }).then(function (groups) {


            var eventsArray = [];
            groups.forEach(function (group) {

               eventsArray.push({
                   title: group.name,
                   start: group.startDate,
                   end: group.endDate
               });
            });
            req.events = eventsArray;
            return next();

        });
    };
};
