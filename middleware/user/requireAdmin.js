var requireAuthentication = require('./requireAuthentication');

module.exports = function () {
    return [requireAuthentication, function (req, res, next) {
            if (req.user.admin) {
                return next();
            } else {
                return res.render('pages/errors/not-authorized');
            }
    }];
};