//* Experess notes ..
const express = require("express");
const { Adminauth, userAuth } = require("./middleware/auth");
const app = express();

//! Below you will find all the express methods provided by the express
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

//& this is  of nested routing in the next js .. and you will find the next() Method this method is use to move to next call back  see below properly ,,,
//& single route like user will only give one respone .. rest of  thing you know in the lecture
//! And if you dont provide any res  in the code of route  then it will give loading state .
//! if you use next()  then you must use  route/callback after that otherwise it will give the error if no res provided ..
app.use(
  "/user",
  (req, res, next) => {
    console.log("response 1 ");
    // res.send("response 1 ! ");
    next();
  },
  (req, res, next) => {
    console.log("response 2 ");
    res.send("response 2 ");
    next();
  }
);

// ! the things we learn above is middlewware topic see what happen i just write that ibn hindi just read it very carefully .
// 1) ye jo next()  methods hai iska use hum karte hai kisi bhi routes se next rote  me jane ke liye..
//   abb isme error and problems kya hai vo suno see agar yee call hua and iske niche koi route nai hai aur jis route me ye call hua hai waha pee koi response nai hai then vo error degaaa aisa isliye hoga kyuki jo express js hai vo route by rourte mattch karte hue jata hai until and unless usko koi response na mile ...
// ex.  app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("response 1 ");
//     // res.send("response 1 ! ");
//     next();
//   },
//   (req, res, next) => {
//     console.log("response 2 ");
//     // res.send("response 2 ");
//     next();
//   }
// ); ye error dega kyuki isko respoonse nai mila

// 2) agar kisi bhi route me res nai hai then vo loading state me jayega ...
// ex . app.use(
//   "/user",
//   (req, res, ) => {
//     console.log("response 1 ");
//     // res.send("response 1 ! ");
//   },
// ); ye jagega loading me matlab infinite loop me
// 3) routing me arrangment bhot jada matter karti hai ye samaj lena videos  me dekh hi hoga tumne ...

// 4) Abb samajata hu ki ye concept hi middleware ka concept hai like samjo kii jo route response deta hai usko request handler route  kahate  hai and baki jo route in between ate hai unko kahate hai middlewares ...
// ex . app.use(
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
// ); ya pe first route middleware hai and 2nd vala request handler

//?  go and check the Middleware folder and inside that auth.jsx there i right a middleware and from  there you will understand  what is acctually the middleware is ... below you will find the code

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
