const express = require("express");
const Router = express.Router();

const AuthRoutes = require("../Routes/Auth");
const UserRoutes = require("../Routes/Users");
const LocationRoutes = require("../Routes/Location");
const CameraRoutes = require("../Routes/Camera");
const AlertsRoutes = require("../Routes/Alerts");

Router.use("/Auth", AuthRoutes);
Router.use("/User", UserRoutes);
Router.use("/Location", LocationRoutes);
Router.use("/Camera", CameraRoutes);
Router.use("/Alerts", AlertsRoutes);

module.exports = Router;
