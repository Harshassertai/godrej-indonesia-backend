const mongoose = require("mongoose");

const alertSchema = mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    alert: {
      type: String,
    },
    image: {
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

const User = mongoose.model("alert", alertSchema);
