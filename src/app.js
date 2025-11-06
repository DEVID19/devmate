const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello User on the Dashboard");
});

app.get("/test", (req, res) => {
  res.send("Hello User on test");
});

app.get("/hello", (req, res) => {
  res.send("Namaste Users");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
