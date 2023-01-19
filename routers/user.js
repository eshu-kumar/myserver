const express = require("express");
const cors = require("cors");
const router = new express.Router();
router.use(cors());
const User = require("../models/user");
const auth = require("../middleware/auth");
router.post("/user/signup", cors(), async (req, res) => {
  console.log("in the signup post auth route");
  try {
    const userExists = await User.findOne({
      email: req.body.email,
    });
    if (userExists) {
      throw new Error("User email exists already");
    }
    let user = new User(req.body);
    await user.save(req.body);
    const token = await user.generateAuthToken();
    console.log("sign up done");
    res.status(201).send({
      token,
      email: user.email,
      message: "User signed up successfully",
      isError: false,
    });
  } catch (error) {
    console.log("error in signup post route  ", error);
    res.status(404).send({ message: error.message, isError: true });
  }
});
router.post("/user/login", cors(), async (req, res) => {
  console.log("in the log in route");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    console.log("user log in credential matched");
    res.send({
      message: "User logged in successfully",
      isError: false,
      token,
      email: user.email,
    });
  } catch (error) {
    console.log("error in login post route ", error);
    res.status(404).send({ message: error.message, isError: true });
  }
});
router.post("/user/logout", cors(), auth, async (req, res) => {
  console.log("in the logged out post route ");
  try {
    req.user.tokens = req.user.tokens.filter((item) => {
      item.token != req.token;
    });
    await req.user.save();
    res.send({ message: "Successfully logged out", isError: false });
  } catch (error) {
    console.log("got error in logout route post");
    res.status(404).send({ isError: "true", message: error.message });
  }
});
router.post("/user/authenticate", cors(), auth, async (req, res) => {
  try {
    console.log("in the user profile route");
    res.status(201).send({
      message: `It is VALID session for ${req.user.email}  `,
      email: req.user.email,
      isError: false,
    });
  } catch (error) {
    res.status(404).send({
      message: error,
      isError: true,
    });
  }
});
router.get("/user/get-users", cors(), async (req, res) => {
  //authentication api need to make it post and receive token
  const result = await User.find({});
  res.send({
    message: "data sent successfully",
    data: { users: result },
    isError: false,
  });
});
router.post("/user/image", auth, (req, res) => {
  res.sendFile("profile/IMG_0119.jpg", { root: "." });
});
module.exports = router;
