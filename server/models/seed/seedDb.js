import users from './users';
import parties from './parties';
import offices from './offices';
import Query from '../../helpers/Query';

const seedDb = async () => {
  console.log(`>>>>>>>>>>Seeding Data<<<<<<<<<<`);
  await users()
    .then(() => parties().then(() => offices()))
    .then(() =>
      (async () => {
        await Query.register([1, 3, 3, 'approved']);
        await Query.register([1, 3, 3, 'approved']);
        await Query.register([1, 2, 2, 'approved']);
      })(),
    )
    .catch(error => console.log(error));
};

export default seedDb;
