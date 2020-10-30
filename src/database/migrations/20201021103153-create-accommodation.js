/* eslint-disable linebreak-style */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accommodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location_id: {
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      lat: {
        type: Sequelize.STRING
      },
      long: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      host_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Accommodations');
  },
};
