module.exports = function(models) {
    return function (req, res, next) {

        var currTime = new Date();

        models.group.findAll({
            where: {
                $and: [
                    {startDate:  { lt: currTime  }},
                    {endDate:{ gt: currTime}}
                    ]
            }
        }).then(function (groups) {
                req.groups = groups;
                return next();
                //
            });
    };
}