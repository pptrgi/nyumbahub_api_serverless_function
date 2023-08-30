const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const changeUserPassword = async (req, res) => {
  const email = req.userEmail; // email got after login and verifying the access token
  const { userId } = req.params;
  if (!userId || !email) return res.sendStatus(401);

  const { newPassword } = req.body;
  if (!newPassword) return res.sendStatus(400);

  try {
    // check if this user exists
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.sendStatus(401);

    const matchingIds = currentUser._id.toString() === userId.toString();
    if (!matchingIds) return sendStatus(401);

    // hash the provided password and update user's details
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    currentUser.password = hashedPassword;
    await currentUser.save();

    res.status(200).json({ success: "password updated successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = changeUserPassword;
