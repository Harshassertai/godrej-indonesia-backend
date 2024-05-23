const express = require("express");
const Router = express.Router();

const AuthRoutes = require("../Routes/Auth");
const FiltersRoutes = require("../Routes/filters");
const AlertsTableRoutes = require("../Routes/Alerts");
const UsersTableRoutes = require("../Routes/Users");
const PersonRoutes = require("../Routes/Person");
const CountsRoutes = require("../Routes/Counts");
const last24hrsRoutes = require("../Routes/last24Hours");
const support = require("../Routes/Support");

// Router.use("/Auth", AuthRoutes);
// Router.use("/Filters", FiltersRoutes);
Router.use("/Table", AlertsTableRoutes);
// Router.use("/Users", UsersTableRoutes);
// Router.use("/Person", PersonRoutes);
// Router.use("/counts", CountsRoutes);
// Router.use("/last24hrs", last24hrsRoutes);
// Router.use("/support", support);
module.exports = Router;
