const Property = require("../../models/PropertyModel");
const Category = require("../../models/CategoryModel");
const Type = require("../../models/TypeModel");

const addProperty = async (req, res) => {
  // ensure the required fields are filled
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.type ||
    !req.body.price ||
    !req.body.category ||
    !req.body.location
  )
    return res
      .status(400)
      .json({ message: "All property details are required" });

  // create the name slug
  const slugName = (name) => {
    return String(name).toLowerCase().split(" ").join("-");
  };
  if (req.body.name) {
    req.body.nameSlug = slugName(req.body.name);
  }
  console.log(req.body.nameSlug);

  try {
    // check if this property already exists in the database
    const similarProperty = await Property.findOne({
      nameSlug: req.body.nameSlug,
    });
    if (similarProperty) return res.sendStatus(409);

    // add a new property with the provided details
    const newProperty = await Property.create(req.body);

    // add this property to its associated type and categories
    const categories = req.body.category.map((cat) => cat.categoryId); // returns an array of category id's
    for (let category of categories) {
      await Category.findByIdAndUpdate(
        category,
        {
          $push: {
            properties: {
              propertyName: newProperty.name,
              propertyId: newProperty._id,
            },
          },
        },
        {
          new: true,
        }
      );
    }

    const typeId = req.body.type.typeId; // returns the type id
    await Type.findByIdAndUpdate(
      typeId,
      {
        $push: {
          properties: {
            propertyName: newProperty.name,
            propertyId: newProperty._id,
          },
        },
      },
      {
        new: true,
      }
    );

    // respond with a 201 and the added property
    res.status(201).json(newProperty);
  } catch (error) {
    console.log(error);
    // incase the property couldn't be added successfully
    res.sendStatus(500);
  }
};

module.exports = addProperty;
