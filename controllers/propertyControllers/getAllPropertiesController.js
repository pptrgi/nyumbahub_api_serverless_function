const Property = require("../../models/PropertyModel");

const getAllProperties = async (req, res) => {
  const queries = req.query;
  const destructuredQueries = { ...queries };
  console.log(queries);
  console.log(destructuredQueries);

  const exemptKeys = ["sort", "page", "limit", "fields"];
  exemptKeys.forEach((key) => delete queries[key]);
  // FILTERING
  // after exempting sort, page, limit and fields keys, the rest of the keys are for filtering
  // will reach the database
  let queryStrings = JSON.stringify(queries);
  console.log(queryStrings);

  // search for logical operta and replace them with Mongodb commands
  // just to match with the mongo commnads
  queryStrings = queryStrings.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  console.log(queryStrings);

  // convert stringified query back to JS object
  let filteredProperties = Property.find(JSON.parse(queryStrings));

  // SORTING
  if (destructuredQueries.sort) {
    const sortValues = destructuredQueries.sort.split(",").join(" ");
    console.log(destructuredQueries.sort);
    console.log(sortValues);
    filteredProperties = filteredProperties.sort(sortValues);
  } else {
    filteredProperties = filteredProperties.sort("-createdAt");
  }

  // LIMITING NUMBER OF FIELDS
  if (destructuredQueries.fields) {
    const fields = destructuredQueries.fields.split(",").join(" ");
    console.log(fields);
    filteredProperties = filteredProperties.select(fields);
  } else {
    filteredProperties = filteredProperties.select("-__v");
  }

  // PAGINATION
  const page = destructuredQueries.page;
  const limit = destructuredQueries.limit;
  const skip = (page - 1) * limit;

  const numberOfDocuments = await Property.countDocuments();
  if (skip > numberOfDocuments)
    return res.status(404).json({ message: "No such page" });

  filteredProperties = filteredProperties.skip(skip).limit(limit);

  const allProperties = await filteredProperties;
  res.json(allProperties);
};

module.exports = getAllProperties;
