const validateInput = (req, res, next) => {
  let error = 'Invalid value provided for: ';
  let flag;
  let fields;
  if (req.originalUrl.split('/')[5] === 'register')
    fields = [[req.body.office, 'office'], [req.body.party, 'party']];
  else fields = [[req.body.office, 'office'], [req.body.candidate, 'candidate']];
  fields.map(field => {
    if (Number.isNaN(field[0]) || field[0] % 1 !== 0) {
      error += `${field[1]}, `;
      flag = true;
    }
  });
  if (flag)
    return res.status(400).send({
      status: 400,
      error: `${error}Please provide an integer.`,
    });
  return next();
};

export default validateInput;
