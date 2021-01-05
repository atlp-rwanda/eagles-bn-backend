/* eslint-disable linebreak-style */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        as: 'receiver',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Notification.belongsTo(models.User, {
        foreignKey: 'creator_id',
        as: 'creator',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Notification.init({
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(10485760),
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });

  return Notification;
};
