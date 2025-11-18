const { tempUserValidation } = require("../validation/user");
const {verifySchema} = require("../validation/user")
const {updateProfileValidation} = require("../validation/user")
const {loginValidation} = require("../validation/user")
const {forgotValidation} = require("../validation/user")
const {verifyOtpValidation} = require("../validation/user")
const {resetValidation} = require("../validation/user")


module.exports = {
  tempUserValidation,
  verifySchema,
  updateProfileValidation,
  loginValidation,
  forgotValidation,
  verifyOtpValidation,
  resetValidation
};
