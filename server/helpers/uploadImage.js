import multer from 'multer';
import dotenv from 'dotenv';

dotenv.load();
const uploadImage = (field, req, res, next) => {
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
    return next();
  });
};

export default uploadImage;
