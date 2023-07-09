const cloudinary = require("cloudinary");

// configure cloudinary with the cloud name, api key and api secret to use
cloudinary.config({
  cloud_name: process.env.C_CLOUD_NAME,
  api_key: process.env.C_API_KEY,
  api_secret: process.env.C_API_SECRET,
});

// cloudinaryUpload function accepts the local (multer-stored) image path as the argument
// returns a promise that resolves with the cloud-uploaded image's URL - secure URL
const cloudinaryUpload = async (imagePath) => {
  return await new Promise((resolve) => {
    cloudinary.uploader.upload(imagePath, (result) => {
      console.log(result);
      resolve({
        imageUrl: result.secure_url,
      });
    });
  });
};

module.exports = cloudinaryUpload;
