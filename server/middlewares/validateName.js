const validateName = (req, res, next) => {
  let partyNameLength;
  if (req.body.name) {
    partyNameLength = req.body.name.trim().split(/\s+/).length;
  }
  if (partyNameLength < 2 || req.body.name.trim().length > 70) {
    return res.status(400).send({
      status: 400,
      error: 'Comment too short or too long',
    });
  }
  return next();
};

export default validateName;
