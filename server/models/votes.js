import db from './db';

module.exports = async () => {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS votes(
        id SERIAL UNIQUE NOT NULL,
        created_on TIMESTAMP,
        candidate INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
        office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
        created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
        PRIMARY KEY (office, created_by)
      )`,
    );
  } catch (error) {
    console.log(error);
  }
};
