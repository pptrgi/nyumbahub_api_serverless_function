const Category = require("../../models/CategoryModel");

const createCategory = async (req, res) => {
  // check for the name field in the request body
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      message: "Category name is required",
    });

  try {
    // check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return res.sendStatus(409);

    // create a new category with the provided name
    const newCategory = await Category.create(req.body);

    res
      .status(201)
      .json({ success: `Category ${newCategory.name} created successfully` });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = createCategory;
