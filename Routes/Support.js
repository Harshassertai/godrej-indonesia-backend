const express = require("express");
const Router = express.Router();
const { support } = require("../Controllers/Support");
Router.post("/sendquery", support);

module.exports = Router;
