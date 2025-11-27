const express = require("express");
const requestRouter = express.Router();
const User = require("../Models/User");
const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send(
      "Connection Request Sent Successfully " +
        req.user.firstName +
        " send the request"
    );
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = requestRouter;
