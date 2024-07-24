const express = require("express");
const Router = express.Router();
const {signup,login,forgotPassword} = require("../Controllers/Auth");

Router.post("/login", login);
Router.post("/signup", signup);
Router.post("/forgotpassword", forgotPassword);
// Router.post("/resetpassword", AuthController.resetPassword);
// // Router.patch("/oldpasswordupdate", AuthController.resetOldPassword);

module.exports = Router;
