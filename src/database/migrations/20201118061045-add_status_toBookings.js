module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Bookings', // table name
      'status', // new field name
      {
        type: Sequelize.STRING,
        defaultValue: "pending"
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Bookings', 'status'),
  ])
};
