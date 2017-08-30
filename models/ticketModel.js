"use strict";

module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define(
        "ticket",
        {
            description: DataTypes.STRING,
            roomNumber: DataTypes.INTEGER
        },
        {
            classMethods: {
                associate: function (models) {
                    Ticket.hasOne(models.user);
                }
            }
        });

    return Ticket;
};
