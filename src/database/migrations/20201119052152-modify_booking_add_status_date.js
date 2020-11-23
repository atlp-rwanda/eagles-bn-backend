'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Bookings', // table name
      'status_updated_at', // new field name
      {
        type: Sequelize.DATE,
        allowNull: true
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Bookings', 'status_updated_at'),
  ])
};
