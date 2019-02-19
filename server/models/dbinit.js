import dropTables from './dropTables';
import createTables from './createTables';
import seedDb from './seed/seedDb';

try {
  (async () => {
    await dropTables();
    console.log('Database tables successfully dropped');
    await createTables();
    console.log('Database tables recreated successfully');
    await seedDb().then(() => console.log('Initial Data seeded successfully'));
  })();
} catch (error) {
  console.log('An unexpected error occured', error);
}
