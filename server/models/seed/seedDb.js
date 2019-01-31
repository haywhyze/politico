import users from './users';
import parties from './parties';
import offices from './offices';

const seedDb = async () => {
  await users();
  await parties();
  await offices();
};

export default seedDb;
