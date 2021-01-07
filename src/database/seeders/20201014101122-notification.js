/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      tripId: 6,
      creator_id: 5,
      receiver_id: 3,
      description: 'requested a trip',
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tripId: 5,
      creator_id: 4,
      receiver_id: 3,
      description: "requested a trip",
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tripId: 3,
      creator_id: 3,
      receiver_id: 4,
      description: "rejected your request",
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tripId: 4,
      creator_id: 3,
      receiver_id: 5,
      description: 'approved your request',
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {})
};
