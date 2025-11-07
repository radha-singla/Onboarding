const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports.sessions = mongoose.model("sessions", sessionSchema);
