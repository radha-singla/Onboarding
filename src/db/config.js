// const mongoose = require("mongoose");

// module.exports.connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.URL);
//     console.log("Database connected successfully");

//   } catch (err) {
//     console.log("Database not connected", err);
//   }
// };

const mongoose = require("mongoose");
const URL = process.env.URL;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDb };
