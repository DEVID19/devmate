const express = require("express");
const profileRouter = express.Router();
const User = require("../Models/User");
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // Validate my token
    const user = req.user;
    res.send("User  Data: " + user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
