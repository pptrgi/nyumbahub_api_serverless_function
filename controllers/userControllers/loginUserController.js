const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  // check if the user provided their email and password
  const { email, password } = req?.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  try {
    // find this user in the database
    const foundUser = await User.findOne({ email });
    if (!foundUser) res.sendStatus(401);

    // user exists, match the passwords
    const matchingPasswords = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!matchingPasswords) return res.sendStatus(403);

    // with a valid user, assign them access and refresh tokens
    // respond with an access token and a cookie that stores the refresh token
    // update the user's data in the database
    const accessToken = jwt.sign(
      { userEmail: email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "59s" }
    );
    const refreshToken = jwt.sign(
      { userEmail: email },
      process.env.REFRESH_TOKEN,
      { expiresIn: "3d" }
    );

    foundUser.refreshToken = refreshToken;
    const userWithToken = await foundUser.save();
    console.log(userWithToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = loginUser;
