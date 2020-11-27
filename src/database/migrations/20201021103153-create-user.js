/* eslint-disable linebreak-style */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'requester',
            },
            manager: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 3,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isConfirmed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            birth_date: {
                type: Sequelize.DATE
            },
            preferred_language: {
                type: Sequelize.STRING
            },
            preferred_currency: {
                type: Sequelize.STRING,
                allowNull: false
            },
            notifyByEmail: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            birth_date: {
                type: Sequelize.DATE
            },
            preferred_language: {
                type: Sequelize.STRING
            },
            preferred_currency: {
                type: Sequelize.STRING
            },
            where_you_live: {
                type: Sequelize.STRING
            },
            profile_image: {
                type: Sequelize.TEXT
            },
            father_name: {
                type: Sequelize.STRING
            },

            mother_name: {
                type: Sequelize.STRING
            },

            phone_number: {
                type: Sequelize.STRING
            },

            nationality: {
                type: Sequelize.STRING
            },

            marital_status: {
                type: Sequelize.ENUM,
                values: [
                    'Not specified',
                    'Single',
                    'Married',
                ],
                defaultValue: 'Single'
            },
            gender: {
                type: Sequelize.ENUM,
                values: [
                    'Male',
                    'Female',
                ],
                defaultValue: 'Female'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    },
};