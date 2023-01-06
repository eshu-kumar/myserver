const express = require("express");
const cors = require("cors");
const router = new express.Router();
router.use(cors());
const Course = require("../models/course");
const auth = require("../middleware/auth");
const multer = require("multer");
//this is for fs promisses
const { access, mkdir } = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

//this is for normal functions
const {
  createReadStream,
  createWriteStream,
  copyFileSync,
  readFileSync,
  writeFileSync,
} = require("fs");
//other genral uses
const fs = require("fs");
const multiparty = require("multiparty");
const util = require("util");
const uuid4 = require("uuid");
const dicer = require("dicer");
router.post("/course/create-course", auth, (req, res) => {
  let form = new multiparty.Form();
  //later replace user email with user id
  let useremail = req.user.email;
  let course = { owner: useremail };
  let dirName = `uploads/${useremail}`;
  // Errors may be emitted
  // Note that if you are listening to 'part' events, the same error may be
  // emitted from the `form` and the `part`.
  form.on("error", function (err) {
    console.log("Error parsing form: " + err.stack);
  });
  // Parts are emitted when parsing the form
  form.on("part", async function (part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"
    if (part.filename === undefined) {
      // filename is not defined when this is a field and not a file
      let data = "";
      part.on("data", (chunk) => {
        data += chunk;
      });
      part.on("end", () => {
        course[part.name] = data;
        // Do something with the data
      });
    }
    if (part.filename !== undefined) {
      // filename is  defined when this is a file
      count++;
      // Extract the file extension from the original file name
      const fileExtension = path.parse(part.filename).ext;
      const newFileName = `${v4()}${fileExtension}`;
      course[part.name] = newFileName;
      try {
        await access("./uploads");
      } catch {
        await mkdir("./uploads");
      }
      try {
        await access(dirName);
      } catch {
        await mkdir(dirName);
      }
      // create a write stream for the destination file
      const writeStream = await createWriteStream(`${dirName}/${newFileName}`);
      part
        .pipe(writeStream)
        .on("close", async () => {
          let courseMongo = new Course(course);
          await courseMongo.save(req.body);
          console.log("file written on disk by streaming successfully");
        })
        .on("error", () => {
          res.send({ message: "file could not be saved", isError: true });
          count = 0;
        });
    }

    part.on("error", function (err) {
      // decide what to do
      res.send({ message: "file could not be saved", isError: true });
      count = 0;
    });
  });
  // Close emitted after form parsed
  form.on("close", function () {
    res.send({
      message: `Course created successfully ${count} files Received`,
      data: { course },
      isError: false,
    });
    count = 0;
  });
  // Parse req
  form.parse(req);
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

  const result = await Course.find({ owner: req.user.email });
  res.send({
    message: "course list fetched successfully",
    data: { courses: result, userEmail: req.user.email },
    isError: false,
  });
});
//some previous experiments will be cleaned later
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploaded-data");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
let count = 0;
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
