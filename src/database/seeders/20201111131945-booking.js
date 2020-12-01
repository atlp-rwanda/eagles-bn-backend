'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Bookings', [
      {
        user_id: 1,
        room_id: 2,
        accommodation_id: 1,
        status: 'pending',
        check_in_date: new Date(Date.now() + 60e4),
        check_out_date: new Date(Date.now() + 60e5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        room_id: 3,
        accommodation_id: 2,
        status: 'pending',
        check_in_date: new Date(Date.now() + 60e4),
        check_out_date: new Date(Date.now() + 60e5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        room_id: 3,
        accommodation_id: 2,
        status: 'approved',
        check_in_date: new Date(Date.now() + 60e4),
        check_out_date: new Date(Date.now() + 60e5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        room_id: 3,
        accommodation_id: 2,
        status: 'pending',
        check_in_date: new Date(Date.now() + 60e4),
        check_out_date: new Date(Date.now() + 60e5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        room_id: 4,
        accommodation_id: 4,
        status: 'pending',
        check_in_date: new Date(Date.now() + 60e4),
        check_out_date: new Date(Date.now() + 60e5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Bookings', null, {}),
};
