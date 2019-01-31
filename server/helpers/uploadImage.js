import multer from 'multer';
import rimraf from 'rimraf';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.load();
const uploadImage = (field, req, res, next) => {
  const upload = multer({
    dest: './uploads/',
    limits: {
      fileSize: 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  }).single(field);

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
      cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        if (error)
          return res.status(500).send({
            status: 500,
            error: 'Internal Server Error while uploading image to cloudinary',
          });
        res.locals.image = result.secure_url;
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

export default uploadImage;
