const User = require("../../models/UserModel");
const Property = require("../../models/PropertyModel");

const handleReviews = async (req, res) => {
  const userEmail = req.userEmail; // user needs to be signed in
  const { name, review } = req.body;
  const { propertyId } = req.params;

  if (!userEmail || !propertyId) return res.sendStatus(401);
  if (!name || !review) return res.sendStatus(400);

  try {
    const currentProperty = await Property.findById(propertyId);
    if (!currentProperty) return res.sendStatus(401);

    const currentUser = await User.findOne({ email: userEmail });
    if (!currentUser) return res.sendStatus(401);

    const alreadyReviewed = currentProperty.reviews.find(
      (review) => review.reviewedBy.toString() === currentUser._id.toString()
    );
    if (alreadyReviewed) return res.sendStatus(403);

    const updatedProperty = await Property.findByIdAndUpdate(
      currentProperty._id,
      {
        $push: {
          reviews: {
            name: name,
            review: review,
            reviewedBy: currentUser._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = handleReviews;
