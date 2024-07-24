let LocationModel = require("../models/LocationModel");

module.exports.GetLocation = async (req, res) => {
  try {
    let data = await LocationModel.find();
    res.send(data);
  } catch (error) {}
};

module.exports.CreateLocation = async (req, res) => {
  const { name } = req.body;
  try {
    let data = await LocationModel.create({
      location: name,
      status: true,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: `Error creating location :- ${error}` });
  }
};
