const express = require("express");
const { Adminauth, userAuth } = require("./middleware/auth");

const connectDB = require("./config/database");
const app = express();
const User = require("./Models/User");

//& below you see the middleware that provide the functionality that chnage the json data into js object and it is provided by default

app.use(express.json());

app.post("/signup", async (req, res) => {
  //? Creating the instance of the User model

  const user = new User(req.body);

  // const user = new User({
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   emailId: "virat@gmail.com",
  //   password: "virat@123",
  // });

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
