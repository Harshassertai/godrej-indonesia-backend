const express = require("express");
const Router = express.Router();
const {
  getlast24hrsTotalCount,
  getlast24hrsEntryCount,
  getlast24hrsExitCount,
  getlast24hrsTatCount,
  getlast24hrsAlertList,
  get24hrsCardAlertsList,
  get24hrsLatestAlerts,
  get24hrsTopLatestAlerts,
  barGraphCountsfor24hrs,
  lineGraphCountsfor24hrs,
  barGraphClickFor24hrs,
  lineGraphCountsfor24hrsfortat,
  barGraphClickFor24hrsForUserAssigned,
} = require("../Controllers/last24Hours");
const { isAuthenticated } = require("../middleware/TokenCheck");

//For Cards
Router.post("/last24hrstotalcount", getlast24hrsTotalCount);
Router.get("/last24hrsEntrycount", getlast24hrsEntryCount);
Router.get("/last24hrsExitcount", getlast24hrsExitCount);
Router.get("/last24hrsTatcount", getlast24hrsTatCount);

//For Tables
Router.get("/last24hrsAlerts", isAuthenticated, getlast24hrsAlertList);
Router.get("/latest24hrsAlerts", get24hrsLatestAlerts);
Router.get("/latest24TopAlerts", get24hrsTopLatestAlerts);
Router.post(
  "/last24hrsCardAlertsTable",
  isAuthenticated,
  get24hrsCardAlertsList
);

//For Graphs
Router.get("/bargraphcountsfor24hrs", barGraphCountsfor24hrs);
Router.post("/barclickfor24hrs", barGraphClickFor24hrs);
Router.post(
	"/barclickfor24hrsForUserAssigned",
	barGraphClickFor24hrsForUserAssigned
);
Router.get("/linegraphcountsfor24hrs", lineGraphCountsfor24hrs);
Router.get("/linegraphcountsfor24hrsfortat", lineGraphCountsfor24hrsfortat);

module.exports = Router;
