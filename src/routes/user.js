const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const Connection = require("../Models/Connection");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const connectionRequests = await Connection.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "gender",
      "age",
      "skills",
      "photoURL",
    ]);

    res.json({
      message: "Connection requests retrieved successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = userRouter;
