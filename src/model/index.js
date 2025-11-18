const { users } = require("../model/user");
const { sessions } = require("../model/session");
const { tempUser } = require("../model/tempUser");
const {otps} = require("../model/otp")

module.exports = {
  users,
  tempUser,
  sessions,
  otps
};
