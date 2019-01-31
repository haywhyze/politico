import db from './db';

module.exports = async () => {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS offices(
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT UNIQUE NOT NULL
      )`,
    );
  } catch (error) {
    console.log(error);
  }
};
