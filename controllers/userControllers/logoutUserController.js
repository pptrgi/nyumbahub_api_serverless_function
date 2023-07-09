const User = require("../../models/UserModel");

const logoutUser = async (req, res) => {
  // find a cookie called jwt
  // its okay if there are no cookies/refresh token because they are to be removed anyway
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); // 204

  // extract the refresh token from the jwt cookie
  const refreshToken = cookies.jwt;

  try {
    // find the user with this refresh token
    // fine if the user doesn't exist, delete the cookie they have though
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204); // 204
    }

    // delete the refresh token from the db and clear the cookie
    foundUser.refreshToken = null;
    await foundUser.save();

    console.log(foundUser);

    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204); // 204
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = logoutUser;
