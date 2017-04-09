"use strict";


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    authschId: DataTypes.STRING,
    userAvatar: DataTypes.STRING
  }, {
    classMethods: {
    //  associate: function(models){
      //  Group.hasMany(models.User);
    //  }
    }
  });
  return User;
};
