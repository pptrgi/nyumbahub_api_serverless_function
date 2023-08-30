const express = require("express");
const verifyAuthToken = require("../customMiddlewares/verifyAuthToken");
const validateMongoId = require("../customMiddlewares/validateMongoId");
const isAdmin = require("../customMiddlewares/isAdmin");
const router = express.Router();

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
const getUserWishlist = require("../controllers/userControllers/getUserWishlist");

// property imports
const addProperty = require("../controllers/propertyControllers/addPropertyController");
const getAllProperties = require("../controllers/propertyControllers/getAllPropertiesController");
const handleWishlist = require("../controllers/propertyControllers/wishlistController");
const handleReviews = require("../controllers/propertyControllers/reviewsController");
const uploadToCloudinary = require("../controllers/propertyControllers/uploadImageController");
const deleteProperty = require("../controllers/propertyControllers/deletePropertyController");
const getOneProperty = require("../controllers/propertyControllers/getOnePropertyController");
const {
  uploadToMulter,
  resizeImage,
} = require("../customMiddlewares/uploadImageMiddleware");

// category imports
const createCategory = require("../controllers/categoryControllers/createCategoryController");
const getOneCategory = require("../controllers/categoryControllers/getOneCategoryController");
const deleteCategory = require("../controllers/categoryControllers/deleteCategoryController");

// type imports
const createType = require("../controllers/typeControllers/createTypeController");
const getOneType = require("../controllers/typeControllers/getOneTypeController");
const deleteType = require("../controllers/typeControllers/deleteTypeController");

// ROUTES

// user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", verifyAuthToken, logoutUser);
router.get("/user/generate-token", verifyAuthToken, generateToken);
router.get("/user/all", verifyAuthToken, isAdmin, getAllUsers);
router.get("/user/wishlist", verifyAuthToken, getUserWishlist);
router.put("/user/forgot-password-token", emailForgotPasswordLink);
router.put(
  "/user/block-user/:id",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  blockUser
);
router.put(
  "/user/unblock-user/:id",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  unblockUser
);
router.put("/user/reset-password/:resetToken", resetForgottenPassword);
router.put(
  "/user/change-password/:userId",
  verifyAuthToken,
  validateMongoId,
  changeUserPassword
);

router.put(
  "/user/update/:userId",
  verifyAuthToken,
  validateMongoId,
  updateUser
);
router.delete(
  "/user/delete/:userId",
  verifyAuthToken,
  validateMongoId,
  deleteUser
);
router.get(
  "/user/:userId",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  getOneUser
);

// property routes
router.post("/property/add", verifyAuthToken, isAdmin, addProperty);
router.get("/property/all-properties", getAllProperties);
router.put(
  "/property/wishlist/:propertyId",
  verifyAuthToken,
  validateMongoId,
  handleWishlist
);
router.put(
  "/property/add-review/:propertyId",
  verifyAuthToken,
  validateMongoId,
  handleReviews
);
router.put(
  "/property/upload-image/:propertyId",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  uploadToMulter.array("image", 10),
  resizeImage,
  uploadToCloudinary
);
router.delete(
  "/property/delete/:propertyId",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  deleteProperty
);
router.get("/property/:propertyId", validateMongoId, getOneProperty);

// category routes
router.post("/category/create", verifyAuthToken, isAdmin, createCategory);
router.get("/category/:categoryId", validateMongoId, getOneCategory);
router.delete(
  "/category/delete/:categoryId",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  deleteCategory
);

// type routes
router.post("/type/create", verifyAuthToken, isAdmin, createType);
router.get("/type/:typeId", validateMongoId, getOneType);
router.delete(
  "/type/delete/:typeId",
  verifyAuthToken,
  isAdmin,
  validateMongoId,
  deleteType
);

module.exports = router;
