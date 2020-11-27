/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            "Users", [{
                    first_name: "Default_Admin",
                    last_name: "Doe",
                    email: "admin@eagles.com",
                    password: "$2y$08$tzeZdIhvUMF98lUKEIvaq.oV9741IsQnXDIgXl8ZgPstFbDJdiDwa",
                    role: "admin",
                    manager: "",
                    isConfirmed: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: "Default_Super_Admin",
                    last_name: "Doe",
                    email: "super@eagles.com",
                    password: "$2b$08$Pzt/WxCPPJX3zJpCW8qhx.vD.O/GZ.Pyuq8vTb0ya8q4eG5khtANC",
                    role: "super-admin",
                    manager: "",
                    isConfirmed: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: "Default_Manager",
                    last_name: "Doe",
                    email: "manager@eagles.com",
                    password: "$2y$08$tzeZdIhvUMF98lUKEIvaq.oV9741IsQnXDIgXl8ZgPstFbDJdiDwa",
                    role: "manager",
                    manager: "",
                    isConfirmed: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: "Default_Requester",
                    last_name: "Smith",
                    email: "requester@eagles.com",
                    password: "$2y$08$jzIEaZB9oetIMe3mgq9rcOGeAkfwQMe.OzRq2j0YXZeULCA17KQ2S",
                    role: "requester",
                    manager: "3",
                    isConfirmed: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        ),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("Users", null, {}),
};