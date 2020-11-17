module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Bookings", [{
      user_id: 1,
      room_id: 2,
      accommodation_id: 1,
      check_in_date: "2021-02-22",
      check_out_date: "2021-02-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      room_id: 3,
      accommodation_id: 1,
      check_in_date: "2021-02-22",
      check_out_date: "2021-02-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      room_id: 3,
      accommodation_id: 1,
      check_in_date: "2021-05-22",
      check_out_date: "2021-08-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      room_id: 5,
      accommodation_id: 1,
      check_in_date: "2020-02-22",
      check_out_date: "2020-02-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      room_id: 5,
      accommodation_id: 1,
      check_in_date: "2020-02-22",
      check_out_date: "2020-02-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      room_id: 4,
      accommodation_id: 2,
      check_in_date: "2021-10-22",
      check_out_date: "2021-12-22",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]
  ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Bookings", null, {}),
};
