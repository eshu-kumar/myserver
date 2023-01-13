const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  coursename: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
    trim: true,
  },
  studentLearn: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  requirements: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  owner: {
    //use later the user id instead of using email of the user
    //this field will be used to create the relationship betweeen task and the user
    type: String,
    required: true,
    ref: "Course",
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
