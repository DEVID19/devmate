const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const Connection = require("../Models/Connection");
const { default: mongoose } = require("mongoose");
const User = require("../Models/User");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //* check the allowed status
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
      //*check toUserId is valid

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      //*Prevent sending a request to yourself

      if (fromUserId.toString() === toUserId.toString()) {
        return res
          .status(400)
          .json({ error: "Cannot send connection request to yourself" });
      }

      //* Check if user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ error: "User not found" });
      }

      //* Check duplicate connection request (either direction)

      const existing = await Connection.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existing) {
        return res.status(409).json({ error: "Connection already exists" });
      }

      const connectionRequest = new Connection({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error : " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const loginUserId = req.user._id;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const connectionRequest = await Connection.findOne({
        _id: requestId,
        toUserId: loginUserId._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({ error: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: `Connection request ${status} successfully`,
        data,
      });
    } catch (error) {
      res.status(400).send("Error : " + error.message);
    }
  }
);

module.exports = requestRouter;
