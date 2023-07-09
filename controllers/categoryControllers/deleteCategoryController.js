const Category = require("../../models/CategoryModel");
const Property = require("../../models/PropertyModel");

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) return res.sendStatus(401);

  try {
    const currentCategory = await Category.findById(categoryId);
    if (!currentCategory) return res.sendStatus(204);

    // remove this category from the properties with it
    const propertiesIdArray = currentCategory.properties.map(
      (property) => property.propertyId
    );

    for (let propertyId of propertiesIdArray) {
      const property = await Property.findByIdAndUpdate(
        propertyId,
        {
          $pull: {
            category: {
              categoryName: currentCategory.name,
              categoryId: currentCategory._id,
            },
          },
        },
        { new: true }
      );
    }

    // delete the category
    await Category.findByIdAndDelete(categoryId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = deleteCategory;
