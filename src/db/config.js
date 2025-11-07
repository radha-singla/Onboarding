const mongoose = require("mongoose");

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database connected successfully");
    
  } catch (err) {
    console.log("Database not connected", err);
  }
};
