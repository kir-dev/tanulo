"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    name: DataTypes.STRING,
    authschId: DataTypes.STRING,
    userAvatar: DataTypes.STRING
  }, {
      classMethods: {
          associate: function(models){
              User.belongsToMany(models.group, {through: 'userGroup'});
          }
      }
  });


  return User;
};
