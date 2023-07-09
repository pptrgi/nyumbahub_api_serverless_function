const Type = require("../../models/TypeModel");

const createType = async (req, res) => {
  // check for the name field in the request body
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      message: "Type name is required",
    });

  try {
    // check if the type already exists
    const existingType = await Type.findOne({ name });
    if (existingType) return res.sendStatus(409);

    // create a new type with the provided name
    const newType = await Type.create(req.body);

    res
      .status(201)
      .json({ success: `Type ${newType.name} created successfully` });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = createType;
