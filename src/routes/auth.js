const express = require("express");
const authRouter = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

const { ValidateSignUp } = require("../utils/Validation");

authRouter.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   emailId: "virat@gmail.com",
  //   password: "virat@123",
  // });
  try {
    //! Validate the data before creating the user
    ValidateSignUp(req);
    //Encrypt the password before saving to the database
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //? Creating the instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("data Save Successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//! login api

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      //Create the jwt token

      const token = await user.getJWT();

      res.cookie("token", token);

      //Add the token to the cookie and send the response back to the user

      res.send("Login Successful");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successful");
});



module.exports = authRouter;
