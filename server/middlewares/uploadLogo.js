import multer from 'multer';

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
      res.status(400).send({
        status: 400,
        error: err.message,
      });
    } else if (err) {
      next(err);
    }
    next();
  });
};

export default uploadlogo;
