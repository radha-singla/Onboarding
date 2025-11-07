const {signup} = require("../controller/user")
const {verify} = require("../controller/user")
const {updateProfile} = require("../controller/user")
const {login} = require("../controller/user")
const {logout} = require("../controller/user")
const {forgot} = require("../controller/user")

module.exports ={
    signup,
    verify,
    updateProfile,
    login,
    logout,
    forgot

}