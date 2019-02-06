import rimraf from 'rimraf';
import cloudinary from 'cloudinary';

const uploadToCloudinary = (req, res, next) => {
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
};

export default uploadToCloudinary;
