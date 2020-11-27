/* eslint-disable linebreak-style */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            User.hasMany(models.Notification, {
                foreignKey: 'receiver',
                as: 'notifications',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            User.hasMany(models.Trips, {
                foreignKey: 'requester_id',
                as: 'requester'
            });
            User.hasMany(models.Trips, {
                foreignKey: 'manager_id',
                as: 'managers'
            });
            User.hasMany(models.Booking, {
                onDelete: 'CASCADE',
                foreignKey: "user_id"
            });
        }
    }
    User.init({
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
            defaultValue: 3,
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
        birth_date: {
            type: DataTypes.DATE
        },
        preferred_language: {
            type: DataTypes.STRING
        },
        preferred_currency: {
            type: DataTypes.STRING
        },
        where_you_live: {
            type: DataTypes.STRING
        },
        profile_image: {
            type: DataTypes.TEXT
        },
        father_name: {
            type: DataTypes.STRING
        },
        mother_name: {
            type: DataTypes.STRING
        },

        phone_number: {
            type: DataTypes.STRING
        },

        nationality: {
            type: DataTypes.STRING
        },
        marital_status: {
            type: DataTypes.ENUM,
            values: [
                'Not specified',
                'Single',
                'Married',
            ],
            defaultValue: 'Single'
        },
        gender: {
            type: DataTypes.ENUM,
            values: [
                'Male',
                'Female',
            ],
            defaultValue: 'Female'
        },
        remember_travel: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        notifyByEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};