const cloudinaryUpload = require("../../config/uploadImageConfig");
const Property = require("../../models/PropertyModel");

const uploadToCloudinary = async (req, res) => {
  const { propertyId } = req.params;
  if (!propertyId) return res.sendStatus(401);

  const files = req.files;

  try {
    // upload each image file to cloudinary and add the returned image URL to the cloudUrls array
    // for loop awaits uploading to cloudinary, forEach() won't
    const cloudUrls = [];
    for (let file of files) {
      const localPath = file.path;
      const cloudUrl = await cloudinaryUpload(localPath); // returns a secure image URL
      cloudUrls.push(cloudUrl);
    }

    // find the property being uploaded images for
    const currentProperty = await Property.findById(propertyId);
    if (!currentProperty) return res.sendStatus(401);

    // add each and every url in the cloudUrls array to the Property's images field
    currentProperty.images = cloudUrls.map((url) => url);
    await currentProperty.save();

    res.status(200).json(currentProperty);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = uploadToCloudinary;
