const express = require("express");
const Router = express.Router();
const { getUsersList, deleteUser, editUser } = require("../Controllers/Users");
const { isAuthenticated } = require("../middleware/TokenCheck");
Router.get("/userslist", isAuthenticated, getUsersList);
Router.post("/deleteUser", deleteUser);
Router.post("/editUser", editUser);

module.exports = Router;
