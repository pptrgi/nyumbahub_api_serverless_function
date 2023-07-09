const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameSlug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      default: "Description goes here",
    },
    type: {
      typeName: String,
      typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
      },
    },
    features: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [],
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    category: [
      {
        categoryName: String,
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      },
    ],
    reviews: [
      {
        name: String,
        review: String,
        reviewedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    location: {
      place: String,
      town: String,
      county: String,
      country: String,
      postalCode: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
