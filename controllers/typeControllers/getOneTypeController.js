const Type = require("../../models/TypeModel");

const getOneType = async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) return res.sendStatus(401);

  try {
    // find if the type exists
    const foundType = await Type.findById(typeId)
      .select(["-__v", "-_id"])
      .populate("properties.propertyId");
    if (!foundType) return res.sendStatus(404);

    res.status(200).json(foundType);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneType;
