import partiesData from '../models/parties';

const validateID = (req, res, next) => {
  let endpointRoot = req.url.split('/')[1];
  if (endpointRoot === 'offices') endpointRoot = 'office';
  else endpointRoot = 'party';
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0) {
    return res.status(400).send({
      status: 400,
      error: `${endpointRoot} ID value provided is not valid`,
    });
  }
  const found = partiesData.find(e => e.id === id);
  if (!found) {
    return res.status(404).send({
      status: 404,
      error: `${endpointRoot} ID provided does not exist`,
    });
  }
  return next();
};

export default validateID;
