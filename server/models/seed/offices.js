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
    await db.query(text, values[0]);
    await db.query(text, values[1]);
    await db.query(text, values[2]);
  } catch (error) {
    console.log(error);
  }
};

export default offices;
