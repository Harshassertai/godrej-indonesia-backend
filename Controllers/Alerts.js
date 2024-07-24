let AlertModel = require("../models/AlertsModel");

module.exports.GetAlertsList = async (req, res) => {
  console.log("Get Alerts List");
  try {
    let data = await AlertModel.find();
    res.send(data);
  } catch (error) {}
};

module.exports.CreateAlert = async (req, res) => {
  let { date, time, alert, camera, image } = req.body;
  try {
    let data = await AlertModel.create({
      date,
      time,
      alert,
      camera,
      image,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: `Error creating Alert :- ${error}` });
  }
};
