const express = require("express");
const Router = express.Router();
const AuthController = require("../Controllers/Auth");

Router.post("/login", AuthController.login);
Router.post("/signup", AuthController.signup);
Router.post("/forgotpassword", AuthController.forgotPassword);
Router.post("/resetpassword", AuthController.resetPassword);
// Router.patch("/oldpasswordupdate", AuthController.resetOldPassword);

module.exports = Router;
