const mongoose = require("mongoose");

const CameraSchema = mongoose.Schema(
  {
    camera: {
      type: String,
      default: "",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const camera = mongoose.model("camera", CameraSchema);

module.exports = camera;
