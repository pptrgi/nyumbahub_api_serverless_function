const User = require("../models/UserModel");

const isAdmin = async (req, res, next) => {
  const userEmail = req.userEmail; // after login
  if (!userEmail) return res.sendStatus(403);

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.sendStatus(403);

    if (user.roles !== "admin") {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = isAdmin;
