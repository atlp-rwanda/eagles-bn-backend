/* eslint-disable linebreak-style */
const up = (queryInterface) => queryInterface.bulkInsert('Locations', [
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
]);

const down = (queryInterface) => queryInterface.bulkDelete('Locations', null, {});

export { up, down };
