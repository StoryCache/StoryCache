const { Pool } = require('pg');

const Entry = new Pool({
  connectionString: process.env.PG_URI,
});

module.exports = Entry; 
