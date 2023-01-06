const User = require("../models/user");
const jwt = require("jsonwebtoken");
async function auth(req, res, next) {
  try {
    console.log("in the auth middleware ");
    //some requests are sending token in body and some in header prefer sending tokens in headers
    let token = req.body.token;
    if (!token) token = req.headers.token;
    if (!token) {
      throw new Error("No token provided for authentication");
    }
    //the secret will come from server enviornment variables
    const decoded = jwt.verify(token, "sssh");
    console.log("token verified");
    let user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("unable to authenticate");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log("got error in auth middleware", error.message);
    res.status(404).send({ message: error.message, isError: true });
  }
}
module.exports = auth;
