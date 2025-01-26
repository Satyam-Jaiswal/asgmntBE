const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const stream = cloudinary.uploader.upload_stream(
    { resource_type: "image" },
    (error, result) => {
      if (error) {
        return next(error);
      }
      req.file.cloudinaryUrl = result.secure_url;
      next();
    }
  );

  stream.end(req.file.buffer);
};

module.exports = uploadToCloudinary;
