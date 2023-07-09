const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  properties: [
    {
      propertyName: String,
      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    },
  ],
});

module.exports = mongoose.model("Type", typeSchema);
