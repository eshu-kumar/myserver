const Review = require("../../models/review");
const review = {
  Query: {
    reviews: async () => {
      try {
        const reviews = await Review.find();
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },
    review: async (_, { id }) => {
      try {
        const review = await Review.findById(id);
        if (!review) {
          throw new Error("Review not found");
        }
        return review;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createReview: async (_, { reviewer, review }) => {
      const newReview = new Review({
        reviewer,
        review,
      });
      try {
        await newReview.save();
        return newReview;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateReview: async (_, { id, reviewer, review }) => {
      try {
        const reviewToUpdate = await Review.findById(id);
        if (!reviewToUpdate) {
          throw new Error("Review not found");
        }
        if (reviewer) reviewToUpdate.reviewer = reviewer;
        if (review) reviewToUpdate.review = review;
        await reviewToUpdate.save();
        return reviewToUpdate;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteReview: async (_, { id }) => {
      try {
        const reviewToDelete = await Review.findById(id);
        if (!reviewToDelete) {
          throw new Error("Review not found");
        }
        await reviewToDelete.remove();
        return reviewToDelete;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
module.exports = review;
