'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: "id"
        }
      },
      accommodation_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      check_in_date: {
        type: Sequelize.DATE
      },
      check_out_date: {
        type: Sequelize.DATE
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Bookings');
  }
};
