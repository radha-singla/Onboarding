const jwt = require("jsonwebtoken");

module.exports.createToken = (tokenData) => {
  const expiresIn = "1d";
  const secret_key = process.env.SECRET_KEY;
  return jwt.sign({ tokenData }, secret_key, { expiresIn });
};
