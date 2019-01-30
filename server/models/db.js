import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.load();

const connectionString =
  process.env.DB_URL_TEST || process.env.DB_URL_DEV || process.env.DB_URL_PROD;

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
