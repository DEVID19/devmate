const { mongo, default: mongoose } = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  //reference to the User collection 
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
      enum: ["interested", "accepted", "rejected", "ignored"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
