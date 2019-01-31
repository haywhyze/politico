import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../db';

dotenv.load();

const saltRounds = 10;
const adminPassword = process.env.ADMIN_PASSWORD;
const userPassword = process.env.USER_PASSWORD;

const users = async () => {
  const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds);
  const hashedUserPassword = await bcrypt.hash(userPassword, saltRounds);

  const text = `
  INSERT INTO users(
    firstname,
    lastname,
    othernames,
    email,
    phone_number,
    password,
    is_admin,
    passport_url
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const values = [
    [
      'Yusuf',
      'Abdulkarim',
      'Ayo',
      'haywhyze@hotmail.com',
      '08031961496',
      `${hashedAdminPassword}`,
      true,
      new Date(),
    ],
    [
      'Ayobami',
      'Olaitan',
      'Abdulwaheed',
      'haywhyze@myspace.com',
      '08055744044',
      `${hashedUserPassword}`,
      false,
      new Date(),
    ],
    [
      'Shade',
      'Saheed',
      'Rofiat',
      'yusufayo19@yahoo.com',
      '07085033470',
      `${hashedUserPassword}`,
      false,
      new Date(),
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

export default users;
