module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('pages/errors/not-authenticated');
    }
};