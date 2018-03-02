var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var request = require('request');

var models = require('../models');

var authSch = 'https://auth.sch.bme.hu';

module.exports = function () {
    passport.use(new OAuth2Strategy({
            authorizationURL: authSch + '/site/login',
            tokenURL: authSch + '/oauth2/token',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/example/callback",
            scope: JSON.parse(process.env.SCOPE)
        },
        function (accessToken, refreshToken, profile, callback) {
            request(authSch + '/api/profile?access_token=' + accessToken,
                function (error, response, body) {
                    var authSchUser = JSON.parse(body);
                    models.user.findOrCreate({
                        where: {
                            authschId: authSchUser.internal_id
                        },
                        defaults: {
                            name: authSchUser.displayName,
                            email: authSchUser.mail,
                            admin: false
                        }
                    }).spread(function (user, created) {
                        return callback(error, user);
                    });
                });
        }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (userId, done) {
        models.user.findById(userId).then(user => done(null, user));
    });
};