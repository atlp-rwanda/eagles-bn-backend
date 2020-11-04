/* eslint-disable linebreak-style */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      requester_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: true,
      },
      trip_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      to: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      departure_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      reasons: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Pending",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trips");
  },
};
