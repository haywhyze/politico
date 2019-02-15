const validateUserInput = (req, res, next) => {
  const error = [];
  const { password, confirmPassword } = req.body;
  let { fullname, email, phoneNumber } = req.body;

  phoneNumber = phoneNumber.toString().trim();
  if (!/^[+]?(\d{0,3})(\d{10})$/.test(phoneNumber)) {
    error.push(`Phone Number is invalid ${phoneNumber}`);
  } else res.locals.phoneNumber = phoneNumber;

  if (password !== confirmPassword) error.push('Passwords do not match.');
  else res.locals.password = password;

  if (password.length < 8 || password.length > 32)
    error.push('Password too short or too long. Pls provide password between 8 and 32 chars.');

  fullname = fullname.toString().trim();
  if (!/^[a-zA-Z][ \-a-zA-Z]{0,50}$/.test(fullname)) {
    error.push('Fullname provided is not valid. Only lowercase/uppercase letters are allowed.');
  } else res.locals.fullname = fullname;

  email = email.toString().trim();
  if (!/^[\w\d.\-_]+@[\w\d.\-_]+\.[\w\d]{1,9}(\.[\w\d]{2,9})?$/.test(email)) {
    error.push('Email provided is not valid.');
  } else res.locals.email = email;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

export default validateUserInput;
