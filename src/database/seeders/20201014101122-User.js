/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users", [{
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@example.com",
        password: "12345678",
        role: "admin",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "test@example.com",
        password: "12345678",
        role: "super-admin",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "John",
        last_name: "Smith",
        email: "johnsmith@example.com",
        password: "12345678",
        role: "requester",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ], {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
