/* eslint-disable linebreak-style */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: Sequelize.INTEGER,
      images: Sequelize.ARRAY(Sequelize.STRING),
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Accommodations',
          key: 'id',
          as: 'accommodation_id',
        },
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  },
};
