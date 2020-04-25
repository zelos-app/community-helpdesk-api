const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Come back with a warrant");
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (decoded.admin) {
      next();
    } else {
      res.status(401).send("This endpoint requires admin permissions");  
    }
  } catch (ex) {
    res.status(401).send("Token expired");
  }
}