import db from './db';

const dropTables = async () => {
  try {
    console.log(`>>>>>>>>>>I'm here droping tables<<<<<<<<<<`);
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
