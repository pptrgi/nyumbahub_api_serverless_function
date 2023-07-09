const User = require("../../models/UserModel");
const Property = require("../../models/PropertyModel");

const handleWishlist = async (req, res) => {
  const { propertyId } = req.params;
  const userEmail = req.userEmail; // the user needs to be signed in

  if (!propertyId || !userEmail) return res.sendStatus(401);

  try {
    const currentProperty = await Property.findById(propertyId);
    if (!currentProperty) return res.sendStatus(401);

    const currentUser = await User.findOne({ email: userEmail });
    if (!currentUser) return res.sendStatus(401);

    // check if the current user had already added this current property to the wishlist
    // if true remove, otherwise add
    const alreadyAdded = currentUser.wishlist.find(
      (property) =>
        property.propertyId.toString() === currentProperty._id.toString()
    );

    let updatedUser;

    if (alreadyAdded) {
      updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        {
          $pull: {
            wishlist: {
              propertyName: currentProperty.name,
              propertyId: currentProperty._id,
            },
          },
        },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: {
            wishlist: {
              propertyName: currentProperty.name,
              propertyId: currentProperty._id,
            },
          },
        },
        { new: true }
      );
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = handleWishlist;
