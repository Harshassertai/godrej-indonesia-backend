const express = require("express");
const Router = express.Router();
const { isAuthenticated } = require("../middleware/TokenCheck");

const { GetAlertsList, CreateAlert } = require("../Controllers/Alerts");

Router.post("/alertsTable", GetAlertsList);
Router.post("/createAlerts", CreateAlert);

module.exports = Router;
