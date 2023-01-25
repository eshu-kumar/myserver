const review = `
type Review {
  id: ID
  reviewer: String
  review: String
}
input ReviewInput {
  reviewer: String!
  review: String!
}
type Query {
  reviews: [Review]
  review(id: ID!): Review
}
type Mutation {
  createReview(review: ReviewInput): Review
  updateReview(id: ID!, review: ReviewInput): Review
  deleteReview(id: ID!): Review
}
`;
module.exports = review;
