const mongoose = require("mongoose");
const LectureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  file: {
    type: String,
    required: true,
    trim: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  owner: {
    //use later the user id instead of using email of the user
    //this field will be used to create the relationship betweeen task and the user
    type: String,
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", LectureSchema);
module.exports = Lecture;
