import db from './db';

module.exports = async () => {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        othernames TEXT,
        email TEXT UNIQUE NOT NULL,
        phone_number TEXT NOT NULL,
        password TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL,
        passport_url TEXT
      )`,
    );
  } catch (error) {
    console.log(error);
  }
};
