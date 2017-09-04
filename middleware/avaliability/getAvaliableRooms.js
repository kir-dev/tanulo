module.exports = function(models) {
    return function (req, res, next) {

        var currTime = new Date();
        console.log(currTime);

        models.group.findAll({
            where: {
                $and: [
                    {startDate:  { lt: currTime  }},
                    {endDate:{ gt: currTime}}
                    ]
            }
        }).then(function (groups) {
                console.log(groups);
                req.groups = groups;

                return next();
                //
            });
    };
}