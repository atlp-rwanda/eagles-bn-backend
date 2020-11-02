/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Locations', [
    {
      name: 'Kigali - Rubavu',
      code: 'GHT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kigali - Lagos',
      code: 'BGH',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kigali - NewYork',
      code: 'RHZ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chicago - Kigali',
      code: 'MHZ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kigali - Dubai',
      code: 'KDJ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {})
};
