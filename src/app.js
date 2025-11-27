const express = require("express");
const { userAuth } = require("./middleware/auth");

const connectDB = require("./config/database");
const app = express();
const User = require("./Models/User");
const { ValidateSignUp } = require("./utils/Validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

//& below you see the middleware that provide the functionality that chnage the json data into js object and it is provided by default

app.use(express.json());

app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
