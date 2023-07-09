const Property = require("../../models/PropertyModel");
const Category = require("../../models/CategoryModel");
const Type = require("../../models/TypeModel");

const deleteProperty = async (req, res) => {
  const { propertyId } = req.params;
  if (!propertyId) return res.sendStatus(401);

  try {
    const currentProperty = await Property.findById(propertyId);
    if (!currentProperty) return res.sendStatus(204);

    // remove the property from it's associated type and categories
    const typeId = currentProperty.type.typeId;
    const updatedType = await Type.findByIdAndUpdate(
      typeId,
      {
        $pull: {
          properties: {
            propertyName: currentProperty.name,
            propertyId: currentProperty._id,
          },
        },
      },
      { new: true }
    );

    const categories = currentProperty.category.map((cat) => cat.categoryId);
    let updatedCategory;
    for (let category of categories) {
      updatedCategory = await Category.findByIdAndUpdate(
        category._id,
        {
          $pull: {
            properties: {
              propertyName: currentProperty.name,
              propertyId: currentProperty._id,
            },
          },
        },
        { new: true }
      );
    }

    // delete the property
    const deletedProperty = await Property.findByIdAndDelete(
      currentProperty._id
    );

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = deleteProperty;
