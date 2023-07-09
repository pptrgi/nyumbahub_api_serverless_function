const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      propertyName: String,
      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    },
  ],
  roles: {
    type: String,
    default: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  passwordModifiedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresAt: Date,
});

module.exports = mongoose.model("User", userSchema);
