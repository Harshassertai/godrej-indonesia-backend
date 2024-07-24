const express = require("express");
const Router = express.Router();
const { GetLocation, CreateLocation } = require("../Controllers/Location");

Router.get("/getLocations", GetLocation);
Router.post("/createLocations", CreateLocation);

module.exports = Router;
