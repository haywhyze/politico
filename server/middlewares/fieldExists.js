import Query from '../helpers/Query';

const fieldExists = async (req, res, next) => {
  let result;
  let field;
  if (req.originalUrl.split('/')[3] === 'auth') {
    result = await Query.checkDuplicate('users', 'email', [res.locals.email]);
    field = 'Email address';
  } else {
    result = await Query.checkDuplicate('offices', 'name', [res.locals.name]);
    field = 'Political Office';
  }
  if (result.rows[0]) {
    return res.status(409).send({
      status: 409,
      error: `${field} already Exists`,
    });
  }
  return next();
};

export default fieldExists;
