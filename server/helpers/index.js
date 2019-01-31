import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const joinStrings = strings => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const splitName = fullName => {
  const namesArr = fullName.split(' ');
  let [firstName, lastName, ...otherNames] = namesArr;
  otherNames = otherNames.join(' ');
  return { firstName, lastName, otherNames };
};

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);

const generateToken = id => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET,
    { expiresIn: '7d' },
  );
  return token;
};

export { joinStrings, hashPassword, comparePassword, splitName, generateToken };
