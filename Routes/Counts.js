const express = require("express");
const Router = express.Router();
const {
  getTotalCount,
  getEntryCount,
  getExitCount,
  getTatCount,
} = require("../Controllers/counts");

Router.post("/totalcount", getTotalCount);
Router.post("/entrycount", getEntryCount);
Router.post("/exitcount", getExitCount);
Router.post("/tatcount", getTatCount);

module.exports = Router;
