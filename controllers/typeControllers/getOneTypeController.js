const Type = require("../../models/TypeModel");
const Property = require("../../models/PropertyModel");

const getOneType = async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) return res.sendStatus(401);

  const queryParams = req.query;
  const destructuredQueryParams = { ...queryParams };

  const exemptParams = ["sort", "limit", "fields"];
  exemptParams.forEach((param) => delete queryParams[param]);

  try {
    // find if the type exists
    const foundType = await Type.findById(typeId);
    if (!foundType) return res.sendStatus(404);

    // return the properties in this type

    //filter
    // const stringQueryParams = JSON.stringify(queryParams);
    // stringQueryParams = stringQueryParams.replace(
    //   /\b(gt|gte|lt|lte)\b/g,
    //   (match) => `$${match}`
    // );

    res.status(200).json(foundType);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneType;
