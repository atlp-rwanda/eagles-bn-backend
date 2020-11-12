module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Trips', // table name
      'email', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Trips', // table name
      'phone', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Trips', // table name
      'gender', // new field name
      {
        type: Sequelize.STRING,
        values: [
          'Male',
          'Female',
          'Other',
        ],
        defaultValue: 'Male'
      },
    ),
    queryInterface.addColumn(
      'Trips', // table name
      'passport', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Trips', // table name
      'id_number', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Trips', // table name
      'marital_status', // new field name
      {
        type: Sequelize.STRING,
        values: [
          'Divorced',
          'Single',
          'Married',
        ],
        defaultValue: 'Single'
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Trips', 'marital_status'),
    queryInterface.removeColumn('Trips', 'id_number'),
    queryInterface.removeColumn('Trips', 'passport'),
    queryInterface.removeColumn('Trips', 'gender'),
    queryInterface.removeColumn('Trips', 'phone'),
    queryInterface.removeColumn('Trips', 'email'),
  ])
};
