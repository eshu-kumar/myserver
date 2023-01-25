const express = require("express");
const cors = require("cors");
const router = new express.Router();
router.use(cors());
const Course = require("../models/course");
const Lecture = require("../models/lecture");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const handleMultiPartForm = require("../utility/handleMultiPartForm");
router.post("/course/create-course", auth, async (req, res) => {
  const sucessMessage = "course created successfully";
  const dirName = "courses";
  handleMultiPartForm(req, res, Course, dirName, sucessMessage);
});
router.post("/course/get-course-info", cors(), async (req, res) => {
  try {
    const courseId = req.body._id;
    const course = await Course.findById(courseId);
    //need to think about sending lectures or not
    const lectures = await Lecture.find({ courseId });
    res.send({
      message: "course list fetched successfully",
      course: course,
      lectures: lectures,
      isError: false,
    });
  } catch (error) {
    res.send({
      message: error.message,
      course: {},
      lectures: [],
      isError: true,
    });
  }
});
router.get("/course/get-course", (req, res) => {
  // console.log("in the get course route");
  //later replace user email with user id  checking git push
  res.sendFile(`/courses/${req.query.file}`, {
    root: "./uploads",
  });
});
router.post("/course/get-courses-list", cors(), async (req, res) => {
  //authentication api need to make it post and receive token
  const query = req.body.query;
  const type = query.type;
  const owner = query.owner ? query.owner : "";
  let result;
  try {
    if (type === "all") {
      result = await Course.find({});
    } else if (type === "myLearnings") {
      //add functionality for enrolling to the course and buying the course
      result = await Course.find({ owner: owner });
    } else if (type === "myCreations") {
      result = await Course.find({ owner: owner });
    }

    // console.log("result in course list ", result);
    res.send({
      message: "course list fetched successfully",
      courses: result,
      isError: false,
    });
  } catch (error) {
    console.log("error in course list ", error);
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
