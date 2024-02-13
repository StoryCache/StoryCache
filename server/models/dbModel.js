const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

module.exports = pool; 
