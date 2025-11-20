const express = require("express");
const routes = express.Router();
const userServices = require("../services/user");
const scheduleMessage = require("../services/schedule")
const { authverify } = require("../middleware/authverify");
const { resetAuth } = require("../middleware/resetAuth");
routes.post("/signup", userServices.signup);

routes.get("/verify/:token1", userServices.verify);
routes.post("/updateProfile", authverify, userServices.updateProfile);
routes.post("/login", userServices.login),
routes.get("/logout", authverify, userServices.logout),
routes.post("/forgot", userServices.forgot);
routes.post("/verifyOtp", userServices.verifyOtp);

routes.get("/reset/:token", (req, res)=>{
  const token= req.params.token;
  res.render('resetUi', {token});
})

//Post Route
routes.post("/reset/:token", resetAuth, userServices.resetPassword);
routes.post("/schedule" , scheduleMessage.createJobs)
module.exports = routes;
