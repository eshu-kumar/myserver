const express = require("express");
const cors = require("cors");
const router = new express.Router();
router.use(cors());
const Course = require("../models/course");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const handleMultiPartForm = require("../utility/handleMultiPartForm");
router.post("/course/create-course", auth, async (req, res) => {
  const sucessMessage = "course created successfully";
  handleMultiPartForm(req, res, Course, sucessMessage);
});

router.get("/course/get-course", (req, res) => {
  // console.log("in the get course route");
  //later replace user email with user id
  res.sendFile(`/${req.query.userEmail}/${req.query.file}`, {
    root: "./uploads",
  });
});
router.post("/course/get-courses-list", cors(), auth, async (req, res) => {
  //authentication api need to make it post and receive token
  try {
    const result = await Course.find({ owner: req.user.email });
    res.send({
      message: "course list fetched successfully",
      courses: result,
      userEmail: req.user.email,
      isError: false,
    });
  } catch (error) {
    res.send({
      message: error.message,
      courses: [],
      isError: true,
    });
  }
});
//some previous experiments will be cleaned later
//multer way of file uploading in multipart form data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/course/upload-image", upload.single("image"), (req, res) => {
  // req.file is the uploaded file
  // You can do something with the file here, such as save it to a database or send it to a third-party API
  res.send("File uploaded successfully");
});

router.get("/course/file-stream", (req, res) => {
  const stream = fs.createReadStream("./normal.txt");
  stream.pipe(res);
});
module.exports = router;
