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
    console.log(error);
  }
};

export default dropTables;
