import dotenv from 'dotenv';
import users from './users';
import parties from './parties';
import offices from './offices';
import candidates from './candidates';
import votes from './votes';
import petitions from './petitions';

dotenv.load();

const createTables = async () => {
  await users();
  await parties();
  await offices();
  await candidates();
  await votes();
  await petitions();
};

export default createTables;
