import dropTables from './dropTables';
import createTables from './createTables';
import seedDb from './seed/seedDb';

(async () => {
  await dropTables();
  await createTables();
  await seedDb();
})();
