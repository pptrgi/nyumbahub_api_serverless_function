const sendLinkToEmail = require("../../config/sendResetLinkToEmail");
const User = require("../../models/UserModel");
const crypto = require("crypto");

const emailForgotPasswordLink = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.sendStatus(401);

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.sendStatus(403);

    // create a password reset token
    // hash the token. You store a hashed reset token in the database
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log(hashedResetToken);

    // update the user's details
    foundUser.passwordResetToken = hashedResetToken;
    foundUser.passwordResetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // minutes
    await foundUser.save();

    // password resetting link
    const resetPassUrl = `Hi, the provided link expires in 30 mins. To reset your password now <a href="http://localhost:3807/api/user/reset-password/${resetToken}">Click here</a>`;

    // send an email to this user with this reset link
    const data = {
      to: foundUser.email,
      subject: "Password Reset Link",
      text: `Hey ${foundUser.firstName}`,
      html: resetPassUrl,
    };

    sendLinkToEmail(data);

    // respond with the reset token
    res.status(200).json({ resetToken });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = emailForgotPasswordLink;
