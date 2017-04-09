"use strict";


module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE

  }, {
    classMethods: {
    //  associate: function(models){
    //   Group.hasMany(models.User);
  //  }
    }
  });
  return Group;
};