import db from './db';

module.exports = async () => {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS petitions(
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP,
        created_by INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
        body TEXT NOT NULL,
        office INTEGER REFERENCES offices (id) ON DELETE CASCADE
      )`,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
