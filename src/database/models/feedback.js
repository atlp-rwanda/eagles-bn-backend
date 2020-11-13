'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Accommodations, {
       foreignKey: "accommodationId",
     });
     Feedback.belongsTo(models.Users, {
       foreignKey: "userId",
     });
   }
    static associate(models) {
    }
  };
  Feedback.init({
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    feedback: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};