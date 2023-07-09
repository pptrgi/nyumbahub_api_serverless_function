const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

//
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "uploadedImages"));
  },
  filename: (req, file, cb) => {
    const fileNameTemplate =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpeg";
    cb(null, fileNameTemplate);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({
      message: "Unsupported file format",
    });
  }
};

const uploadToMulter = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000 },
});

const resizeImage = (req, res, next) => {
  if (!req.files) return next();
  req.files.map(async (file) => {
    console.log(file);
    await sharp(file.path)
      .resize(400, 400)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(__dirname, "..", "public", "property", file.filename));
  });
  next();
};

module.exports = { uploadToMulter, resizeImage };
