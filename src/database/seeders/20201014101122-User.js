/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            "Users", [{
                    first_name: "Default_Admin",
                    last_name: "Doe",
                    email: "admin@eagles.com",
                    password: "$2a$08$yLQT.yKGmHypKm971UfXb.yAHqgL9U3ZdUeAUehXLNpFqXj1Ottbe",
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
                    password: "$2a$08$yLQT.yKGmHypKm971UfXb.yAHqgL9U3ZdUeAUehXLNpFqXj1Ottbe",
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
                    password: "$2a$08$yLQT.yKGmHypKm971UfXb.yAHqgL9U3ZdUeAUehXLNpFqXj1Ottbe",
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
                    password: "$2a$08$yLQT.yKGmHypKm971UfXb.yAHqgL9U3ZdUeAUehXLNpFqXj1Ottbe",
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