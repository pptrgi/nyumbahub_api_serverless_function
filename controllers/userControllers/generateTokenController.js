const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

const generateToken = async (req, res) => {
  // if there's a jwt cookie, extract the refresh token from it
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    // find the user associated with this token
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);

    // verify the refresh token
    // assign a new access token to this user, expires in 15 minutes
    // respond with the generated token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || user.email !== decoded.userEmail) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { userEmail: decoded.userEmail },
        process.env.ACCESS_TOKEN,
        { expiresIn: "900s" }
      );

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = generateToken;
