const Category = require("../../models/CategoryModel");

const getOneCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) return res.sendStatus(401);

  try {
    const foundCategory = await Category.findById(categoryId);
    if (!foundCategory) return res.sendStatus(404);

    res.status(200).json(foundCategory);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneCategory;
