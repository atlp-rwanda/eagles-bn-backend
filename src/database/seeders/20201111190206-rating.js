module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    "Ratings", [{
      accommodation_id: 1,
      trip_id: 1,
      service_rate: 80,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      accommodation_id: 3,
      trip_id: 1,
      service_rate: 70,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      accommodation_id: 2,
      trip_id: 1,
      service_rate: 50,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      accommodation_id: 7,
      trip_id: 1,
      service_rate: 70,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      accommodation_id: 5,
      trip_id: 1,
      service_rate: 40,
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]
  ),

  down: async (queryInterface) =>
    queryInterface.bulkDelete("Ratings", null, {}),
};
