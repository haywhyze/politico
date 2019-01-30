import dotenv from 'dotenv';
import googleMaps from '@google/maps';

dotenv.load();

const validateHqAddress = (req, res, next) => {
  const googleMapsClient = googleMaps.createClient({
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
