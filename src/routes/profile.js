const express = require("express");
const profileRouter = express.Router();
const User = require("../Models/User");
const { userAuth } = require("../middleware/auth");
const { ValidateEditProfile } = require("../utils/Validation");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // Validate my token
    const user = req.user;
    res.send("User  Data: " + user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateEditProfile(req)) {
      throw new Error("Invalid Data Provided");
    }
    const loggedInUser = req.user;

    const updatedUserFields = Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();
    res.send("Profile Updated Successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );
    if (!isPasswordMatch) {
      throw new Error("Old password is incorrect");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = newHashedPassword;
    await loggedInUser.save();
    res.send("Password Updated Successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
