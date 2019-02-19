import Query from '../helpers/Query';

const candidateErrorHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  let result;
  let error;
  result = await Query.candidateOffice([req.body.office, id]);
  if (result.rowCount !== 0) error = 'Candidate already registered for this office';
  result = await Query.partyOffice([req.body.office, req.body.party]);
  if (!error) if (result.rowCount !== 0) error = 'Party already has a candidate for this office';

  if (error)
    return res.status(409).send({
      status: 409,
      error,
    });
  return next();
};

export default candidateErrorHandler;
