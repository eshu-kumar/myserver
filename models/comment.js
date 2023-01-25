const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentor: { type: String, required: true },
  comment: { type: String, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
