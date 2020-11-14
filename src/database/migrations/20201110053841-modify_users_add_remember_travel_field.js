module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Users', // table name
      'remember_travel', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'remember_travel'),
  ])
};
