const jwt = require("jsonwebtoken");

const verifyAuthToken = (req, res, next) => {
  // check if the req has auth headers and if they start with 'Bearer '
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401);

  // extract the access token from the Bearer auth headers
  const accessToken = authHeaders.split(" ")[1];

  // verify the extracted token
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userEmail = decoded.userEmail;
    next(); // call next() here so it only allows moving forward when there are no errors
  });
};

module.exports = verifyAuthToken;
