import { joinStrings, splitName } from '../helpers';

const populateError = (req, ...fields) => {
  const error = [];
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

const resolvePostType = requrl => {
  const urlRoot = requrl.split('/')[3];
  if (urlRoot === 'offices') {
    if (requrl.split('/')[5] === 'register') return 'Register Candidate';
    return 'Create Office';
  }
  if (urlRoot === 'parties') return 'Create Party';
  if (urlRoot === 'vote') return 'Vote';
  return 'Create Account';
};

const fillPostError = req => {
  const postType = resolvePostType(req.originalUrl);
  let error = [];
  let err = [];
  switch (postType) {
    case 'Register Candidate':
      error = populateError(req, 'office', 'party');
      break;
    case 'Create Office':
      error = populateError(req, 'name', 'type');
      break;
    case 'Create Party':
      error = populateError(req, 'name', 'hqAddress');
      break;
    case 'Vote':
      error = populateError(req, 'office', 'candidate');
      break;
    default:
      if (!req.body.fullname) error.push('fullname');
      else {
        const name = splitName(req.body.fullname.toString());
        if (!name.lastName) error.push('lastName');
      }
      err = populateError(req, 'email', 'phoneNumber', 'password', 'confirmPassword');
      if (err[0]) err.map(e => error.push(e));
      break;
  }
  return error;
};

const isEmpty = (req, res, next) => {
  if (req.method === 'PATCH') {
    let path = req.url.split('/');
    path = path[path.length - 1];
    if (!req.body[path]) {
      return res.status(400).send({
        status: 400,
        error: `No ${path} value provided`,
      });
    }
  } else {
    const error = fillPostError(req);
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
