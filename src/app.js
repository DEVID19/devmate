const express = require("express");
const { Adminauth, userAuth } = require("./middleware/auth");

const connectDB = require("./config/database");
const app = express();
const User = require("./Models/User");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Shivaji Maharaj",
    lastName: "Raje",
    emaiId: "Raje@gmail.com",
    password: "Raje@123",
  });

  try {
    await user.save();
    res.send("data Save Successfully");
  } catch (error) {
    res.status(400).send("Error in saving the data to database");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((error) => {
    console.log("Database connot be connected!!");
  });
