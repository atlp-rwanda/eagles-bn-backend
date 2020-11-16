/* eslint-disable linebreak-style */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: 'receiver',
        as: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Notification.init({
    tripId: {
      type: DataTypes.INTEGER
    },
    receiver: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(10485760)
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
