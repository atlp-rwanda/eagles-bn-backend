'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
       Like.belongsTo(models.Accommodations, {
        foreignKey: "accommodationId",
      });
      Like.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
    static associate(models) {
      // define association here
    }
  };
  Like.init({
    accommodationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};