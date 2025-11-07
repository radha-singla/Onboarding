const mongoose = require("mongoose");
const { enums } = require("../constant/enum");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },

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

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    gender: {
      type: Number,
      enum: Object.values(enums.gender),
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneNoVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.isPaswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports.users = mongoose.model("users", userSchema);
