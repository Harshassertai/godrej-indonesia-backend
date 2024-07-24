let CameraModel = require("../models/CameraModel");

module.exports.GetCamera = async (req, res) => {
  try {
    let data = await CameraModel.find();
    res.send(data);
  } catch (error) {}
};

module.exports.CreateCamera = async (req, res) => {
  const { name, locationId } = req.body;
  try {
    let data = await CameraModel.create({
      camera: name,
      location: locationId,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: `Error creating camera :- ${error}` });
  }
};
