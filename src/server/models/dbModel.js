const { Pool } = require('pg');

const pool = new Pool({
  user: 'yhbceqqk',
  host: 'bubble.db.elephantsql.com',
  database: 'yhbceqqk',
  password: 'FJ7RUVleDLvYf1dSvy-nYH3CPbzpU-FT',
  port: 5432,
});

module.exports = pool;
