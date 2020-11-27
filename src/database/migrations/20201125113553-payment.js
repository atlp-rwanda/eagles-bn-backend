'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Bookings', 'paid', {
        type:Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.removeColumn('Bookings', 'paid')]);
  },
};
