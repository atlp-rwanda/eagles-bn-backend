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
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "requester"
        },
        manager: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Patience"
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