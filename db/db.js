const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URL;
    await mongoose.connect(dbUrl);
    console.log("Mongo Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
