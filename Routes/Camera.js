const express = require("express");
const Router = express.Router();
const { GetCamera, CreateCamera } = require("../Controllers/Camera");

Router.get("/getCamera", GetCamera);
Router.post("/createCamera", CreateCamera);

module.exports = Router;
