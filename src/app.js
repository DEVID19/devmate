const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Devid", lastname: "Bisen" });
});
app.post("/user", (req, res) => {
  console.log("Save Data to the database");
  res.send("Data successfully saved at the database");
});

app.delete("/user", (req, res) => {
  res.send("Delets the user successfully");
});

app.put("/user", (req, res) => {
  res.send("put call send to the user successfully");
});

app.patch("/user", (req, res) => {
  res.send("patch call send to the user successfully");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
