import dotenv from 'dotenv';

dotenv.load();

const validateHqAddress = (req, res, next) => {
// eslint-disable-next-line global-require
  const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
  });
  googleMapsClient.places(
    {
      query: req.body.hqAddress.trim().replace(/\s{2,}/gi, ' '),
    },
    (err, response) => {
      if (response.json.results[0]) {
        res.locals.address = response.json.results[0].formatted_address;
        return next();
      }
      return res.status(400).send({
        status: 400,
        error: 'Address not found',
      });
    },
  );
};

export default validateHqAddress;
