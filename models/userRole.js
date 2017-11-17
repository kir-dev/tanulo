'use strict';

module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define(
        'userRole',
        {
            name: DataTypes.STRING
        });

    return UserRole;
};
