const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const Connection = require("../Models/Connection");
const User = require("../Models/User");

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

//^all the connections of the logged in user which are accepted state below we are doing this (count of collection request )
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connections = await Connection.find({
      status: "accepted",
      $or: [{ toUserId: loggedInUserId }, { fromUserId: loggedInUserId }],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "gender",
        "age",
        "skills",
        "photoURL",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "gender",
        "age",
        "skills",
        "photoURL",
      ]);

    const data = connections.map((conn) => {
      if (conn.fromUserId._id.toString() === loggedInUserId.toString()) {
        return conn.toUserId;
      } else {
        return conn.fromUserId;
      }
    });

    res.json({ data });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//? feed api

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //! the main thing is the user should not able to see the own card or is
    //! user must not see the card of the interested , ignored ,accepted status user
    const loggedInUserId = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //? first i will find the connection request either i have send or received

    const connectionRequests = await Connection.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId ");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId);
      hideUsersFromFeed.add(req.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUserId } },
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
      ],
    })
      .select("firstName lastName gender age skills photoURL")
      .skip(skip)
      .limit(limit);

    res.json({ users });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = userRouter;
