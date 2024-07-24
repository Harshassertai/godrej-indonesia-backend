const mongoose = require("mongoose");
require("dotenv").config();
const { DB } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
