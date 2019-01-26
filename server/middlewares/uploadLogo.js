import multer from 'multer';
import rimraf from 'rimraf';
import dotenv from 'dotenv';

dotenv.load();
const cloudinary = require('cloudinary').v2;

const upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single('logoUrl');

const uploadlogo = (req, res, next) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
    if (err) {
      return next(err);
    }
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error)
          return res.status(500).send({
            status: 500,
            error: 'Internal Server Error while uploading image to cloudinary',
          });
        res.locals.logo = result.secure_url;
        rimraf('./uploads/*', e => e);
        return next();
      });
    } else
      return res.status(400).send({
        status: 400,
        error: 'Please upload an image file preferrably a jpg',
      });
  });
};

export default uploadlogo;
