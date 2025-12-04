const { mongo, default: mongoose } = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["interested", "accepted", "rejected", "ignore"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
