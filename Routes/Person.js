const express = require("express");
const Router = express.Router();

const {
	getCount,
	getList,
	totalAlertCounts,
	barGraphCounts,
	lineGraphCountsForAlerts,
	lineGraphCountsForTAT,
	barGraphClick,
	barGraphClickForUsersAssigned,
} = require("../Controllers/Person");

Router.post("/count", getCount);
Router.post("/table", getList);
Router.get("/lastentry", totalAlertCounts);
Router.post("/bargraphcounts", barGraphCounts);
Router.post("/bargraphclick", barGraphClick);
Router.post("/bargraphclickforusersassigned", barGraphClickForUsersAssigned);
Router.post("/linegraphcounts", lineGraphCountsForAlerts);
Router.post("/linegraphcountsfortat", lineGraphCountsForTAT);
module.exports = Router;
