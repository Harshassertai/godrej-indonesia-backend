const express = require("express");
const Router = express.Router();
const { isAuthenticated } = require("../middleware/TokenCheck");

const {
  getAlertList,
  getAlertListDateWise,
  getLatestAlerts,
  getTopLatestAlerts,
  getCardAlertsList,
  comment,
  commentsList,
  statusClose,
  bulkStatusClose,
  bulkCloseComment,
  getCameraByPassTable,
  generatePdf,
  getAlertZoneWise,
  editVisibility,
} = require("../Controllers/AlertsTable");

Router.post("/alertsTable", isAuthenticated, getAlertList);
Router.post("/alertsTableDateWise", isAuthenticated, getAlertListDateWise);
Router.post("/cardalertsTable", isAuthenticated, getCardAlertsList);
Router.post("/alertsTableZoneWise", isAuthenticated, getAlertZoneWise);
Router.post("/latestAlerts", getLatestAlerts);
Router.post("/latestTopAlerts", getTopLatestAlerts);
Router.post("/comment", comment);
Router.post("/commentsList", commentsList);
Router.post("/statusClose", statusClose);
Router.post("/bulkCloseStatus", bulkStatusClose);
Router.post("/bulkcloseComment", bulkCloseComment);
Router.get("/camerabypasstable", getCameraByPassTable);
Router.post("/generatePdf", generatePdf);
Router.post("/editVisibility", editVisibility);

module.exports = Router;
