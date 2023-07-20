const Type = require("../../models/TypeModel");

const getOneType = async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) return res.sendStatus(401);

  const queryParams = req.query;
  // const destructuredQueryParams = { ...queryParams };

  const exemptParams = ["sort", "limit", "fields"];
  exemptParams.forEach((param) => delete queryParams[param]);

  try {
    // find if the type exists
    let foundType = await Type.findById(typeId).select(["-__v", "-_id"]);
    if (!foundType) return res.sendStatus(404);

    res.status(200).json(foundType);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneType;
