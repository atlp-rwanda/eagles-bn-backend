/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users", [{
        first_name: "Jane",
        last_name: "Doe",
        email: "manager@example.com",
        password: "$2b$08$5LnBYOycYlxbYa.V.SOKN.NQU5CpNmdBuKVvyW80l3AmASlVCUsi6",
        role: "manager",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "requester@example.com",
        password: "$2b$08$5LnBYOycYlxbYa.V.SOKN.NQU5CpNmdBuKVvyW80l3AmASlVCUsi6",
        role: "requester",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "John",
        last_name: "Smith",
        email: "manager1@example.com",
        password: "$2b$08$5LnBYOycYlxbYa.V.SOKN.NQU5CpNmdBuKVvyW80l3AmASlVCUsi6",
        role: "manager",
        manager: "1",
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "John",
        last_name: "Smith",
        email: "manag@example.com",
        password: "12345678",
        role: "manager",
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
