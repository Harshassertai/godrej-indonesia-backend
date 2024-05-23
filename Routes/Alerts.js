const express = require("express");
const Router = express.Router();
const { isAuthenticated } = require("../middleware/TokenCheck");

const { GetAlertsList } = require("../Controllers/Alerts");

Router.post("/alertsTable", GetAlertsList);

module.exports = Router;
