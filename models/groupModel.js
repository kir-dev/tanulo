"use strict";

module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define(
        "group",
        {
            name: DataTypes.STRING,
            subject: DataTypes.STRING,
            description: DataTypes.STRING,
            startDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            room: DataTypes.INTEGER,
            doNotDisturb: DataTypes.BOOLEAN
        },
        {
            classMethods: {
                associate: function (models) {
                    Group.belongsToMany(models.user, {through: 'userGroup'});
                    Group.hasOne(models.user, {as: 'owner'});
                }
            }
        });

    return Group;
};
