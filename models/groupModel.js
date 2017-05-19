"use strict";

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("group", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE

  }, {
      classMethods: {
          associate: function (models) {
              Group.belongsToMany(models.user, {through: 'userGroup'});
          }
      }
      });

  return Group;
};
