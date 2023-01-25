const comment = `
type Comment {
  id: ID
  commentor: String
  comment: String
}
input CommentInput {
  commentor: String
  comment: String
}
type Query {
  comments: [Comment]
  comment(id: ID!): Comment
}
type Mutation {
  createComment(comment: CommentInput): Comment
  updateComment(id: ID!, comment: CommentInput): Comment
  deleteComment(id: ID!): Comment
}
`;
module.exports = comment;
