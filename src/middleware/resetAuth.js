const jwt = require("jsonwebtoken");
const Model = require("../model");

module.exports.resetAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.unAuthorized({ message: "Unauthorized" });

    const token = authorization.split("Bearer ")[1];
    if (!token) return res.unAuthorized({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const userEmail = decoded?.email?.email
    req.email = userEmail;
    console.log(req.email);

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
