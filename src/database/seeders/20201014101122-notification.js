/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      tripId: 1,
      receiver: 1,
      description: 'hello you have trip request',
      is_read: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tripId: 1,
      receiver: 1,
      description: "Manager has reject you request",
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tripId: 1,
      receiver: 1,
      description: 'Manager has approved your trip request',
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {})
};
