const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  port: 5432,
  host: "localhost",
  database: "kahoot_db",
});

module.exports = pool;