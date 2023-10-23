const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the token from headers "Bearer 123XYZ..."
    const payload = jwt.verify(token, process.env.TOKEN_SECRET); // decode token and get payload

    req.payload = payload; // to pass the decoded payload to the next route
    next();
  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
};
module.exports = {
  isAuthenticated,
};
