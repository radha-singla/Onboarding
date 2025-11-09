const { users } = require("../model/user");
const { sessions } = require("../model/session");
const { tempUser } = require("../model/tempUser");

module.exports = {
  users,
  tempUser,
  sessions,
};
