const { userSignupValidation } = require("../validation/user");
const {verifySchema} = require("../validation/user")
const {updateProfileValidation} = require("../validation/user")
const {loginValidation} = require("../validation/user")

module.exports = {
  userSignupValidation,
  verifySchema,
  updateProfileValidation,
  loginValidation
};
