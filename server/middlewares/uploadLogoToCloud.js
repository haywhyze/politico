import rimraf from 'rimraf';
import dotenv from 'dotenv';

dotenv.load();
const cloudinary = require('cloudinary').v2;

const uploadLogoToCloud = (req, res, next) => {
  // console.log('jjjjjjjjjjjjjjjj');
  if (req.file) {
    cloudinary.uploader.upload(
      req.file.path,
      { width: 1000, height: 1000, crop: 'limit' },
      (error, result) => {
        if (error)
          return res.status(500).send({
            status: 500,
            error: 'Internal Server Error',
          });
        res.locals.logo = result.secure_url;
        rimraf('./uploads/*', e => e);
        return next();
      },
    );
  } else
    return res.status(400).send({
      status: 400,
      error: 'Please upload an image file preferrably a jpg',
    });
};

export default uploadLogoToCloud;
