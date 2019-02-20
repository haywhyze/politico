import Query from '../helpers/Query';

const candidateErrorHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  if (Number(res.locals.user.id) !== id)
    return res.status(403).send({
      status: 403,
      error: 'You are only allowed to register the logged in user.',
    });
  let result;
  let error;
  result = await Query.candidateOffice([req.body.office, id]);
  if (result.rowCount !== 0) error = 'Candidate already registered for this office';
  result = await Query.partyOffice([req.body.office, req.body.party]);
  if (!error) if (result.rowCount !== 0) error = 'Party already has a candidate for this office';
  result = await Query.checkDuplicate('candidates', 'candidate', [id]);
  if (!error) if (result.rowCount !== 0) error = 'You are already registered for an office';
  if (error)
    return res.status(409).send({
      status: 409,
      error,
    });

  result = await Query.getAll(`parties`, 'id', [req.body.party]);
  if (result.rowCount === 0) error = 'Party ID does not exist';

  result = await Query.getAll(`offices`, 'id', [req.body.office]);
  if (result.rowCount === 0) error = 'office ID does not exist';

  if (error)
    return res.status(404).send({
      status: 404,
      error,
    });

  return next();
};

export default candidateErrorHandler;
