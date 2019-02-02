const validateCandidateInput = (req, res, next) => {
  let error = 'Invalid value provided for: ';
  let flag;
  const fields = [req.body.office, req.body.party];
  fields.map(field => {
    if (Number(field) || field % 1 !== 0) {
      error += `${field} `;
      flag = true;
    }
  });
  if (flag)
    return res.status(400).send({
      status: 400,
      error: `${error}. Pls provide an integer.`,
    });
  return next();
};

export default validateCandidateInput;
