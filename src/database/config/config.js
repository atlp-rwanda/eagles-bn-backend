/* eslint-disable linebreak-style */
require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    password: process.env.DATABASE_PASSWORD,
  },

  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "pg",
    password: process.env.DATABASE_PASSWORD,
  },
  production: {
    url: process.env.DATABASE_URL,
    password: process.env.POSTGRES_PASSWORD,
    dialect: "postgres",
  },
};
