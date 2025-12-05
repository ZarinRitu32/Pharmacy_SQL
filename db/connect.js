const mysql = require("mysql");
const dbconfig = require("./config");
const connectionPool = mysql.createPool(dbconfig.connection);

module.exports = connectionPool;
// config/database.js
module.exports = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // match with .env key
    port: process.env.DB_PORT || 3306, // fallback to 3306
    database: process.env.DB_NAME,
  },
};
