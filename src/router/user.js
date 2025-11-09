const express = require("express");
const routes = express.Router();
const userServices = require("../services/user");
const { authverify } = require("../middleware/authverify");

routes.post("/signup", userServices.signup);
routes.get("/verify/:token1", userServices.verify);
routes.post("/updateProfile", authverify, userServices.updateProfile);
routes.post("/login", userServices.login),
  routes.get("/logout", authverify, userServices.logout),
  routes.post("/forgot", userServices.forgot);

module.exports = routes;
