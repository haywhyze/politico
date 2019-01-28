import { joinStrings } from '../helpers';

const populateError = req => {
  const error = [];
  if (!req.body.name) {
    error.push('name');
  }
  if (!req.body.hqAddress) {
    error.push('hqAddress');
  }
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
  const error = populateError(req);
  if (error[0]) {
    const errorMsg = setErrorMsg(error);
    return res.status(400).send({
      status: 400,
      error: errorMsg,
    });
  }

  return next();
};

export default isEmpty;
