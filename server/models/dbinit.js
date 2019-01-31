import dropTables from './dropTables';
import createTables from './createTables';
import seedDb from './seed/seedDb';

try {
  (async () => {
    await dropTables();
    await createTables();
    await seedDb();
  })();
  console.log('Database successfully created with initial data');
} catch (error) {
  console.log('An unexpected error occured', error);
}
