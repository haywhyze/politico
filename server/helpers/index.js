import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Query from './Query';

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

const generateToken = (id, isAdmin) => {
  const token = jwt.sign(
    {
      userId: id,
      isAdmin,
    },
    process.env.SECRET,
    { expiresIn: '7d' },
  );
  return token;
};

const getSymbol = str =>
  str
    .toLowerCase()
    .split(' ')
    .filter(e => e !== 'of' && e !== 'and' && e !== 'for')
    .map(e => e[0])
    .join('')
    .toUpperCase();

const getOne = async (req, res, path) => {
  const id = Number(req.params.id);
  const { rows } = await Query.getOne(path, [id]);

  return res.status(200).send({
    status: 200,
    data: [rows],
  });
};

const getAll = async (req, res, path) => {
  const { rows } = await Query.getAll(path);
  return res.status(200).send({
    status: 200,
    data: [rows],
  });
};

export {
  getOne,
  getAll,
  joinStrings,
  hashPassword,
  comparePassword,
  splitName,
  generateToken,
  getSymbol,
};
