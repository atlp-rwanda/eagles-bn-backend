/* eslint-disable linebreak-style */
const up = (queryInterface) => queryInterface.bulkInsert('Trips', [
  {
    name: 'john doe',
    user_id: 1,
    trip_type: 'One-way',
    from: 2,
    to: [1, 3],
    date: new Date(),
    return_date: null,
    reasons: 'family vocations',
    accommodation_id: 2,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john smith',
    user_id: 2,
    trip_type: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    return_date: null,
    reasons: 'Work vocation',
    accommodation_id: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Red Janvie',
    user_id: 3,
    trip_type: 'One-way',
    from: 1,
    to: [2, 4],
    date: new Date(),
    return_date: null,
    reasons: 'Visit rwanda',
    accommodation_id: 1,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Rayni Doe',
    user_id: 4,
    trip_type: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    return_date: null,
    reasons: 'cerebrating family member birthday',
    accommodation_id: 4,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export { up, down };
