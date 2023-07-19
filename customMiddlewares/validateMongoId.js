const mongoose = require("mongoose");

// validates the provided MongoDB document's ID through URL params
const validateMongoId = (req, res, next) => {
  const id =
    req.params.id ||
    req.params.propertyId ||
    req.params.userId ||
    req.params.categoryId ||
    req.params.typeId;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    res.status(400).json({ error: `Invalid Id - ${id}` });
  } else {
    next();
  }
};

module.exports = validateMongoId;
