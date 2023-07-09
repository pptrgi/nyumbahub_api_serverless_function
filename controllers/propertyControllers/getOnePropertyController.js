const Property = require("../../models/PropertyModel");

const getOneProperty = async (req, res) => {
  const { propertyId } = req.params;
  if (!propertyId) return res.sendStatus(401);

  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.sendStatus(404);

    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneProperty;
