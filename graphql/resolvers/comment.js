const Comment = require("../../models/comment");
const comment = {
  Query: {
    comments: async () => {
      try {
        const comments = await Comment.find();
        return comments;
      } catch (err) {
        throw new Error(err);
      }
    },
    comment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id);
        if (!comment) {
          throw new Error("Comment not found");
        }
        return comment;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createComment: async (_, { comment }) => {
      const { ...rest } = comment;
      const newComment = new Comment({
        ...rest,
      });
      try {
        await newComment.save();
        return newComment;
      } catch (err) {
        throw new Error(err);
      }
    },

    updateComment: async (_, { id, commentor, comment }) => {
      try {
        const commentToUpdate = await Comment.findById(id);
        if (!commentToUpdate) {
          throw new Error("Comment not found");
        }
        if (commentor) commentToUpdate.commentor = commentor;
        if (comment) commentToUpdate.comment = comment;
        await commentToUpdate.save();
        return commentToUpdate;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        const commentToDelete = await Comment.findById(id);
        if (!commentToDelete) {
          throw new Error("Comment not found");
        }
        await commentToDelete.remove();
        return commentToDelete;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
module.exports = comment;
