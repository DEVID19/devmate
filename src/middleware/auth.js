const Adminauth = (req, res, next) => {
  console.log("Auth for authentication is checking ...");
  const token = "xyz";
  const isauthentication = token === "xyz";
  if (!isauthentication) {
    res.status(401).send("You are not authorised admin ");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User middleware is checking ...");
  const token = "xyz";
  const isUser = token === "xyz";
  if (!isUser) {
    res.status(401).send("You are not authorised user ");
  } else {
    next();
  }
};
module.exports = {
  Adminauth,
  userAuth,
};
