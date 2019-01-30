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
      'http://res.cloudinary.com/haywhyze/image/upload/v1548329998/pdwafyuw0uqo1nlzejde.jpg',
    ],
    [
      'Peoples Democratic Party',
      'PDP',
      'Plot 1970 Michael Okpara St, Wuse, Abuja',
      'http://res.cloudinary.com/haywhyze/image/upload/v1548329998/pdwafyuw0uqo1nlzejde.jpg',
    ],
    [
      'Social Democratic Party',
      'SDP',
      'Plot 1970 Michael Okpara St, Wuse, Abuja',
      'http://res.cloudinary.com/haywhyze/image/upload/v1548329998/pdwafyuw0uqo1nlzejde.jpg',
    ],
  ];

  try {
    await db.query(text, values[0]);
    await db.query(text, values[1]);
    await db.query(text, values[2]);
  } catch (error) {
    console.log(error);
  }
};

export default parties;
