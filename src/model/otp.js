const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    email: {
      type: String,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports.otps = mongoose.model("otps", otpSchema);
