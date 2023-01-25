const review = `
type Friend {
  id: ID
  firstName: String
  lastName: String
  gender: Gender
  language: String
  age: Int
  email: String
  contacts: [Contact]
}
type Contact {
  firstName: String
  lastName: String
}
enum Gender {
  MALE
  FEMALE
  OTHER
}
input FriendInput {
  firstName: String
  lastName: String
  gender: Gender
  language: String
  age: Int
  email: String
  contacts: [ContactInput]
}
input ContactInput {
  firstName: String
  lastName: String
}
type Query {
  getFriends: [Friend]
  
}
type Mutation {
  addFriend(friend: FriendInput): Friend
  
}
`;
module.exports = review;
