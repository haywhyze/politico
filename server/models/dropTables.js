import db from './db';

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS 
    petitions, 
    votes, 
    candidates, 
    offices, 
    parties, 
    users CASCADE`);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
};

export default dropTables;
