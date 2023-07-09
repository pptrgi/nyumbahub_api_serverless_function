const User = require("../../models/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const resetForgottenPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!resetToken || !newPassword) return res.sendStatus(401);

  try {
    // find the user using the token. Also check if the token is valid(not expired)
    console.log(resetToken);

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex"); // hash because the database copy of the token is hashed

    console.log(hashedResetToken);

    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) return res.sendStatus(403);

    // change the user's password and update their details
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.passwordModifiedAt = Date.now();
    user.passwordResetToken = null;
    user.passwordResetTokenExpiresAt = null;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = resetForgottenPassword;
