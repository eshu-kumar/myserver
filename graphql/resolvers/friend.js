const Friend = require("../../models/friend");
const friend = {
  Query: {
    getFriends: async (root, args, context) => {
      // console.log("req header in getfriends resolver", context);
      // console.log("req body in getfriends resolver", context.req.body);
      // console.log("args and root in resolver getfreinds", args, root);
      try {
        const result = await Friend.find({});
        return result;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addFriend: async (root, { friend }, context) => {
      // console.log("req header in addfriend resolver", context.req.headers);
      // console.log("req body in addfriend resolver", context.req.body);
      //console.log("friend is ", friend);
      try {
        const { ...rest } = friend;
        let newFriend = new Friend({ ...rest });
        const result = await newFriend.save();
        return result;
      } catch (error) {
        console.log("error in graphql add friend resolver", error);
        return error;
      }
    },
  },
};
module.exports = friend;
