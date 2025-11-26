const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send("Unauthorized: token is not valied!!");
    }

    const decodedObj = jwt.verify(token, "DEV@Tinder$790");
    const user = await User.findById(decodedObj._id);
    if (!user) {
      return res.status(400).send("Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
};
module.exports = {
  userAuth,
};
