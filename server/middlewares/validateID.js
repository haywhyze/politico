import partiesData from '../models/parties';

const validateID = (req, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 1 || String(req.params.id).indexOf('.') !== -1) {
    return res.status(400).send({
      status: 400,
      error: 'party ID value provided is not valid',
    });
  }
  const found = partiesData.find(e => e.id === id);
  if (!found) {
    return res.status(404).send({
      status: 404,
      error: 'party ID provided does not exist',
    });
  }
  return next();
};

export default validateID;
