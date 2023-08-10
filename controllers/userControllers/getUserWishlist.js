const User = require("../../models/UserModel");

const getUserWishlist = async (req, res) => {
  const userEmail = req.userEmail;
  if (!userEmail) return res.sendStatus(400);

  try {
    const user = await User.findOne({ email: userEmail }).populate("wishlist");
    if (!user) return res.sendStatus(401);

    const userWishlist = user.wishlist;

    res.status(200).json(userWishlist);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getUserWishlist;
