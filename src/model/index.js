const { users } = require("../model/user");
const {otps} = require("../model/otp")
const {sessions} = require("../model/session")

module.exports = {
  users,
  otps,
  sessions
  
};
