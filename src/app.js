const express = require("express");
const { Adminauth, userAuth } = require("./middleware/auth");

const connectDB = require("./config/database");
const app = express();
const User = require("./Models/User");
const { ValidateSignUp } = require("./utils/Validation");
const bcrypt = require("bcryptjs");

//& below you see the middleware that provide the functionality that chnage the json data into js object and it is provided by default

app.use(express.json());

app.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   emailId: "virat@gmail.com",
  //   password: "virat@123",
  // });

  try {
    //! Validate the data before creating the user
    ValidateSignUp(req.body);

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }

    res.send("Login Successful");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//  Get user data by using the emailid

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    console.log("userEmail is :", userEmail);
    const users = await User.find({ emailId: userEmail });
    res.send(users);
  } catch (error) {
    res.status(400).send("Error in finding the user");
  }
});

// get all data in the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error in finding the entire data in the database");
  }
});

//* delete the documents in the database usingb the email id and the userid
//? deleted using the emailid
// app.delete("/delete", async (req, res) => {
//   try {
//     const userEmail = req.body.emailId;
//     const users = await User.deleteOne({ emailId: userEmail });
//     res.send("data is deleted successfully using the emailid");
//   } catch (error) {
//     res.status(400).send("Unable to delete the database ");
//   }
// });
//! deleted using the userid

app.delete("/delete", async (req, res) => {
  try {
    const userId = req.body._id;
    const users = await User.deleteOne({ _id: userId });
    res.send("data successfully deleted using the _id ");
  } catch (error) {
    res.status(400).send("Unable to delete the database");
  }
});

//* update the document using the userid

app.patch("/update", async (req, res) => {
  try {
    const userId = req.body._id;

    // Check if _id is provided
    if (!userId) {
      return res.status(400).send("User ID (_id) is required in request body");
    }

    // Remove _id from the update data
    const { _id, ...updatedData } = req.body;

    // Check if there's any data to update
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).send("No fields to update");
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("Successfully updated the data");
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(400).send("Unable to update the database: " + error.message);
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
