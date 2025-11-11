const express = require("express");
const { Adminauth, userAuth } = require("./middleware/auth");
const app = express();

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Devid", lastname: "Bisen" });
// });
// app.post("/user", (req, res) => {
//   console.log("Save Data to the database");
//   res.send("Data successfully saved at the database");
// });

// app.delete("/user", (req, res) => {
//   res.send("Delets the user successfully");
// });

// app.put("/user", (req, res) => {
//   res.send("put call send to the user successfully");
// });

// app.patch("/user", (req, res) => {
//   res.send("patch call send to the user successfully");
// });

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("response 1 ");
//     // res.send("response 1 ! ");
//     next();
//   },
//   (req, res, next) => {
//     console.log("response 2 ");
//     res.send("response 2 ");
//     next();
//   }
// );
//? let me now show you how the middleware work and how we se the middleware

app.use("/admin", Adminauth);

app.get("/user/login", userAuth, (req, res, next) => {
  console.log("user logged successfully");
  res.send(" User login  successfully");
});

app.get("/admin/getAllData", (req, res, next) => {
  console.log("all data get successfully");
  res.send("all data get successfully");
});

app.get("/admin/deleteUser", (req, res, next) => {
  console.log("delete user successfully");
  res.send("User deleted successfully");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
