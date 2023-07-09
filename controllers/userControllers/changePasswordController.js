const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const changeUserPassword = async (req, res) => {
  const email = req.userEmail; // email got after login and verifying the access token
  const { newPassword } = req.body;
  if (!newPassword || !email) return res.sendStatus(401);

  try {
    // check if this user exists
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.sendStatus(401);

    console.log(currentUser);

    // hash the provided password and update user's details
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    currentUser.password = hashedPassword;
    const updatedUser = await currentUser.save();

    console.log(currentUser);
    res.status(200).json({ success: "password updated successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = changeUserPassword;
