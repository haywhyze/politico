const validateName = (req, res, next) => {
  if (req.body.name.trim().split(/\s+/).length < 2 || req.body.name.trim().length > 70) {
    return res.status(400).send({
      status: 400,
      error: 'Comment too short or too long',
    });
  }
  return next();
};

export default validateName;
