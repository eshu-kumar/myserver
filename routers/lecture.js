const express = require("express");
const cors = require("cors");
const router = new express.Router();
router.use(cors());
const Lecture = require("../models/lecture");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const handleMultiPartForm = require("../utility/handleMultiPartForm");

router.post("/lecture/create-lecture", auth, async (req, res) => {
  const sucessMessage = "Lecture added successfully";
  const dirName = req.user.email;
  handleMultiPartForm(req, res, Lecture, dirName, sucessMessage);
});
router.post("/lecture/get-lecture-info", cors(), auth, async (req, res) => {
  try {
    const result = await Lecture.findById(req.body._id);
    res.send({
      message: "lecture list fetched successfully",
      lecture: result,
      userEmail: req.user.email,
      isError: false,
    });
  } catch {
    res.send({
      message: error.message,
      lecture: {},
      isError: true,
    });
  }
});
router.get("/lecture/get-lecture", (req, res) => {
  // console.log("in the get lecture route");
  //later replace user email with user id
  res.sendFile(`/${req.query.userEmail}/${req.query.file}`, {
    root: "./uploads",
  });
});
router.post("/lecture/get-lectures-list", cors(), auth, async (req, res) => {
  //authentication api need to make it post and receive token
  try {
    const result = await Lecture.find({ owner: req.user.email });
    res.send({
      message: "lecture list fetched successfully",
      lectures: result,
      userEmail: req.user.email,
      isError: false,
    });
  } catch (error) {
    res.send({
      message: error.message,
      lectures: [],
      isError: true,
    });
  }
});

module.exports = router;
