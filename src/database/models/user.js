/* eslint-disable linebreak-style */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, {
        onDelete: 'CASCADE',
        foreignKey: "user_id"
      });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: 'requester',
      },
      manager: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: 'Patience',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
