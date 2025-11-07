const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, "Phone number must be 10 digits"],
    },
    countryCode: {
      type: String,
      match: [/^\+\d{1,3}$/, "Invalid country code format (e.g., +91)"],
    },
    otp: {
      type: Number,
    },
  },
  
  { timestamps: true }
);
module.exports.otps = mongoose.model("otps", otpSchema);
