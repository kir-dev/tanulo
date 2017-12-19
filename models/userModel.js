    'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define(
        'user',
        {
            name: DataTypes.STRING,
            authschId: DataTypes.STRING,
            email: DataTypes.STRING,
            admin: DataTypes.BOOLEAN
        },
        {
            classMethods: {
                associate: function (models) {
                    User.belongsToMany(models.group, {through: 'userGroup'});
                    User.hasMany(models.group);
                }

            }
        });


    return User;
};
