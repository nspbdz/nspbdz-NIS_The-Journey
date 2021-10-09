const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "the-journey",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();