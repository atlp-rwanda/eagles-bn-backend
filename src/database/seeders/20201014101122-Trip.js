/* eslint-disable linebreak-style */
module.exports = {

  up: (queryInterface) => queryInterface.bulkInsert('Trips', [
    {
      name: 'john doe',
      requester_id: 1,
      trip_type: 'One-way',
      from: 2,
      to: [1, 3],
      departure_date: new Date(),
      return_date: null,
      reasons: 'family vocations',
      accommodation_id: 2,
      status: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'john smith',
      requester_id: 2,
      trip_type: 'One-way',
      from: 1,
      to: [2, 1],
      departure_date: new Date(),
      return_date: null,
      reasons: 'Work vocation',
      accommodation_id: 3,
      status: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Red Janvie',
      requester_id: 3,
      trip_type: 'One-way',
      from: 1,
      to: [2, 4],
      departure_date: new Date(),
      return_date: null,
      reasons: 'Visit rwanda',
      accommodation_id: 1,
      status: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rayni Doe',
      requester_id: 4,
      trip_type: 'One-way',
      from: 1,
      to: [2, 1],
      departure_date: new Date(),
      return_date: null,
      reasons: 'cerebrating family member birthday',
      accommodation_id: 4,
      status: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Trips', null, {})
};
