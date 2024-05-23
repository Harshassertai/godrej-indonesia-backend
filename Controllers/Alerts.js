let AlertModel = require("../models/AlertsModel");

module.exports.GetAlertsList = async (req, res) => {
  console.log("Get Alerts List");
  try {
    let data = await AlertModel.find();
    res.send(data);
  } catch (error) {}
};

module.exports.CreateAlert = async (req, res) => {
  console.log("Get Alerts List");
  try {
    let data = await AlertModel.insertOne({ image: "jhd" });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
