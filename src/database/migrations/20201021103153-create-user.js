/* eslint-disable linebreak-style */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false
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
                defaultValue: 'Patience',
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            resetLink: {
                type: Sequelize.STRING,
            },
            isConfirmed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};