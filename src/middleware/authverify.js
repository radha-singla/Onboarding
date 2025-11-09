const jwt = require("jsonwebtoken");
const Model = require("../model");

module.exports.authverify = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.unAuthorized({ message: "Unauthorized" });

    const token = authorization.split("Bearer ")[1];
    if (!token) return res.unAuthorized({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decoded?.tokenData?.id;

    const blacklisted = await Model.sessions.findOne({ userId });
    if (!blacklisted)
      return res.unAuthorized({ message: "Token invalid: user logged out" });

    const findUser = await Model.users.findById(userId);
    if (!findUser) return res.status(401).json({ message: "User not found" });

    req.user = findUser;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
