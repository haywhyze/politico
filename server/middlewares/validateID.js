import Query from '../helpers/Query';

const validateID = async (req, res, next) => {
  let endpoint;
  const endpointRoot = req.originalUrl.split('/')[3];
  if (endpointRoot === 'offices') endpoint = 'office';
  else endpoint = 'party';
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0) {
    return res.status(400).send({
      status: 400,
      error: `${endpoint} ID value provided is not valid`,
    });
  }

  const { rows } = await Query.getAll(`${endpointRoot}`, 'id', [id]);
  if (!rows[0]) {
    return res.status(404).send({
      status: 404,
      error: `${endpoint} ID does not exist`,
    });
  }
  return next();
};

export default validateID;
