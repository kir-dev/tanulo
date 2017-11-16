"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define(
        "user",
        {
            name: DataTypes.STRING,
            authschId: DataTypes.STRING,
            email: DataTypes.STRING,
            roomNumber: DataTypes.INTEGER
        },
        {
            classMethods: {
                associate: function (models) {
                    User.belongsToMany(models.group, {through: 'userGroup'});
                    User.belongsTo(models.userRole, {as: 'role'});
                }

            }
        });


    return User;
};
