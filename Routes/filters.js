const express = require("express");
const Router = express.Router();
const {
	getAlertsList,
	getCamerasList,
	getZonesList,
	getUsersAssignedList,
	getStatusList,
	getByPassCamerasList,
} = require("../Controllers/filters");

Router.get("/alerts", getAlertsList);
Router.get("/cameras", getCamerasList);
Router.get("/zones", getZonesList);
Router.get("/usersassigned", getUsersAssignedList);
Router.get("/status", getStatusList);
Router.get("/byPassCameraList", getByPassCamerasList);

module.exports = Router;
