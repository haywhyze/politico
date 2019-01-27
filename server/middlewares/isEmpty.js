import { joinStrings } from '../helpers';

const populateError = (req, ...fields) => {
  const error = [];
  // eslint-disable-next-line array-callback-return
  fields.map(field => {
    if (!req.body[field]) error.push(field);
  });
  return error;
};

const setErrorMsg = error => {
  let errorMsg;
  if (error.length === 1) {
    errorMsg = `No values provided for ${error[0]}`;
  } else {
    errorMsg = `No values provided for ${joinStrings(error)}`;
  }
  return errorMsg;
};

const isEmpty = (req, res, next) => {
  let path = req.url.split('/');
  path = path[path.length - 1];
  let error;

  if (req.method === 'PATCH') {
    if (!req.body[path]) {
      return res.status(400).send({
        status: 400,
        error: `No ${path} value provided`,
      });
    }
  } else {
    const endpointRoot = req.url.split('/')[1];
    if (endpointRoot === 'offices') error = populateError(req, 'name', 'type');
    else if (endpointRoot === 'parties') error = populateError(req, 'name', 'hqAddress');
    if (error[0]) {
      const errorMsg = setErrorMsg(error);
      return res.status(400).send({
        status: 400,
        error: errorMsg,
      });
    }
  }
  return next();
};

export default isEmpty;
