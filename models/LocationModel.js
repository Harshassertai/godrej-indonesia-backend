const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    location: {
      type: String,
      default: "",
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

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;
