/* eslint-disable linebreak-style */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetLink: {
      type: DataTypes.STRING,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false

    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
