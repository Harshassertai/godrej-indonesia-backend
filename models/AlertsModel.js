const mongoose = require("mongoose");

const alertSchema = mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    alert: {
      type: String,
    },
    comments: {
      type: Array,
    },
    status: {
      type: String,
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

const Alert = mongoose.model("alert", alertSchema);
module.exports = Alert;
