'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Bookings', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'onhold',
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.removeColumn('Bookings', 'status')]);
  },
};