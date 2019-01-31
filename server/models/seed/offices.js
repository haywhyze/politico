import db from '../db';

const offices = async () => {
  const text = `
  INSERT INTO offices(
    type,
    name)
  VALUES($1, $2)
  `;

  const values = [['Presidency', 'federal'], ['Gubertorial', 'state'], ['Senate', 'legislative']];

  try {
    values.map(async value => {
      await db.query(text, value);
    });
  } catch (error) {
    console.log(error);
  }
};

export default offices;
