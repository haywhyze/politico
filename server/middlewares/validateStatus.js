const validateStatus = (req, res, next) => {
  const acceptedStatus = ['approved', 'rejected'];
  if (!acceptedStatus.includes(req.body.status)) {
    return res.status(400).send({
      status: 400,
      error: 'Status not valid. Valid status are: approved and rejected',
    });
  }
  return next();
};

export default validateStatus;
