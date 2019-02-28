import Query from '../helpers/Query';

const validateID = async (req, res, next) => {
  let endpoint;
  let endpointRoot = req.originalUrl.split('/')[3];
  if (endpointRoot === 'offices') {
    if (req.originalUrl.split('/')[5] === 'register') endpoint = 'candidate';
    else endpoint = 'office';
  } else if (endpointRoot === 'parties') endpoint = 'party';
  else endpoint = 'user';
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0) {
    return res.status(400).send({
      status: 400,
      error: `${endpoint} ID value provided is not valid`,
    });
  }

  if (req.originalUrl.split('/')[5] === 'status') endpointRoot = 'candidates';
  if (req.originalUrl.split('/')[5] === 'register') endpointRoot = 'users';
  if (endpointRoot === 'vote') endpointRoot = 'users';
  const result = await Query.getAll(`${endpointRoot}`, 'id', [id]);
  if (result.rowCount === 0) {
    return res.status(404).send({
      status: 404,
      error: `${endpoint} ID does not exist`,
    });
  }
  return next();
};

export default validateID;
