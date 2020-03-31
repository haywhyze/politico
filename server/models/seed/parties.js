import db from '../db';

const parties = async () => {
  const text = `
  INSERT INTO parties(
    name,
    symbol,
    hq_address,
    logo_url
  )
  VALUES($1, $2, $3, $4)
  `;

  const values = [
    [
      'All Progressive Congress',
      'APC',
      'Plot 1970 Michael Okpara St, Wuse, Abuja',
      'https://res.cloudinary.com/haywhyze/image/upload/v1584180370/yks9d6wbldoo4tx8k0yh.jpg',
    ],
    [
      'Peoples Democratic Party',
      'PDP',
      'Plot 1970 Michael Okpara St, Wuse, Abuja',
      'https://res.cloudinary.com/haywhyze/image/upload/v1584180370/yks9d6wbldoo4tx8k0yh.jpg',
    ],
    [
      'Social Democratic Party',
      'SDP',
      'Plot 1970 Michael Okpara St, Wuse, Abuja',
      'https://res.cloudinary.com/haywhyze/image/upload/v1584180370/yks9d6wbldoo4tx8k0yh.jpg',
    ],
  ];

  try {
    values.map(async value => {
      await db.query(text, value);
    });
  } catch (error) {
    console.log(error);
  }
};

export default parties;
