const mongoose = require("mongoose");
require("dotenv").config();
const connectToDb = require("../utils/dbConnect");
const cookieParser = require("cookie-parser");

connectToDb();

const express = require("express");
const app = express();
const serverless = require("serverless-http");
const router = express.Router();

const verifyAuthToken = require("../customMiddlewares/verifyAuthToken");

// user imports
const registerUser = require("../controllers/userControllers/registerUserController");
const loginUser = require("../controllers/userControllers/loginUserController");
const changeUserPassword = require("../controllers/userControllers/changePasswordController");
const logoutUser = require("../controllers/userControllers/logoutUserController");
const generateToken = require("../controllers/userControllers/generateTokenController");
const {
  blockUser,
  unblockUser,
} = require("../controllers/userControllers/block&UnblockUser");
const emailForgotPasswordLink = require("../controllers/userControllers/emailForgotPasswordLink");
const resetForgottenPassword = require("../controllers/userControllers/resetForgottenPassword");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers/getUpdateDeleteUser");

// property imports
const {
  uploadToMulter,
  resizeImage,
} = require("../customMiddlewares/uploadImageMiddleware");

const addProperty = require("../controllers/propertyControllers/addPropertyController");
const getAllProperties = require("../controllers/propertyControllers/getAllPropertiesController");
const handleWishlist = require("../controllers/propertyControllers/wishlistController");
const handleReviews = require("../controllers/propertyControllers/reviewsController");
const uploadToCloudinary = require("../controllers/propertyControllers/uploadImageController");
const deletedProperty = require("../controllers/propertyControllers/deletePropertyController");
const getOneProperty = require("../controllers/propertyControllers/getOnePropertyController");

// category imports
const createCategory = require("../controllers/categoryControllers/createCategoryController");
const getOneCategory = require("../controllers/categoryControllers/getOneCategoryController");
const deleteCategory = require("../controllers/categoryControllers/deleteCategoryController");

// type imports
const createType = require("../controllers/typeControllers/createTypeController");
const getOneType = require("../controllers/typeControllers/getOneTypeController");
const deleteType = require("../controllers/typeControllers/deleteTypeController");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/change-password", verifyAuthToken, changeUserPassword);
router.get("/user/logout", logoutUser);
router.get("/user/generate-token", generateToken);
router.get("/user/all", getAllUsers);
router.put("/user/forgot-password-token", emailForgotPasswordLink);
router.put("/user/block-user/:id", blockUser);
router.put("/user/unblock-user/:id", unblockUser);
router.put("/user/reset-password/:resetToken", resetForgottenPassword);
router.put("/user/update/:userId", updateUser);
router.delete("/user/delete/:userId", deleteUser);
router.get("/user/:userId", getOneUser);

// property routes
router.post("/property/add", addProperty);
router.get("/property/property/all-properties", getAllProperties);
router.put("/property/wishlist/:propertyId", verifyAuthToken, handleWishlist);
router.put("/property/add-review/:propertyId", verifyAuthToken, handleReviews);
router.put(
  "/property/upload-image/:propertyId",
  uploadToMulter.array("image", 10),
  resizeImage,
  uploadToCloudinary
);
router.delete("/property/delete/:propertyId", deletedProperty);
router.get("/property/:propertyId", verifyAuthToken, getOneProperty);

// category routes
router.post("/category/create", verifyAuthToken, createCategory);
router.get("/category/:categoryId", getOneCategory);
router.delete("/category/delete/:categoryId", deleteCategory);

// type routes
router.post("/type/create", verifyAuthToken, createType);
router.get("/type/:typeId", getOneType);
router.delete("/type/delete/:typeId", deleteType);

// database connection
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
