const Type = require("../../models/TypeModel");
const Property = require("../../models/PropertyModel");

const deleteType = async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) return res.sendStatus(401);

  try {
    const currentType = await Type.findById(typeId);
    if (!currentType) return res.sendStatus(204);

    // delete this type from all the properties
    const propertiesIdArray = currentType.properties.map(
      (property) => property.propertyId
    );
    for (let propertyId of propertiesIdArray) {
      const property = await Property.findById(propertyId);
      property.type = null;
      await property.save();
    }

    // delete the type
    await Type.findByIdAndDelete(typeId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = deleteType;
