import db from './db';

module.exports = async () => {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS parties(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT UNIQUE NOT NULL,
        hq_address TEXT NOT NULL,
        logo_url TEXT NOT NULL
      )`,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
