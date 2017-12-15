module.exports = function () {
    return function (req, res, next) {

        if (req.user !== null && req.user.admin) {
            return next();
        } else if (req.user !== null) {

            return next(new Error("Unauthorized"));
        } else {

            res.redirect('/login');
        }
    };
};