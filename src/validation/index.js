const { tempUserValidation } = require("../validation/user");
const {verifySchema} = require("../validation/user")
const {updateProfileValidation} = require("../validation/user")
const {loginValidation} = require("../validation/user")

module.exports = {
  tempUserValidation,
  verifySchema,
  updateProfileValidation,
  loginValidation
};
