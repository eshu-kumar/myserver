const Friend = require("../models/friend");
const Series = require("../models/series");
const resolvers = {
  Query: {
    async getFriends(root, args, context) {
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
    // getSeries: (root) => {
    //   return new Promise((resolve, reject) => {
    //     Series.find((err, series) => {
    //       if (err) reject(err);
    //       else resolve(series);
    //     });
    //   });
    // },
    // findAFriend: (root, { id }) => {
    //   return new Promise((resolve, reject) => {
    //     Friends.findOne({ _id: id }, (err, friend) => {
    //       if (err) reject(err);
    //       else resolve(friend);
    //     });
    //   });
    // },
    // findASeries: (root, { id }) => {
    //   return new Promise((resolve, reject) => {
    //     Series.findOne({ _id: id }, (err, series) => {
    //       if (err) reject(err);
    //       else resolve(series);
    //     });
    //   });
    // },
  },
  Mutation: {
    async addFriend(root, { friend }, context) {
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

    // addSeries: (root, { series }) => {
    //   console.log("series is", series);
    //   const { ...rest } = series;
    //   const newSeries = new Series({
    //     ...rest,
    //   });

    //   return new Promise((resolve, reject) => {
    //     newSeries.save((err, series) => {
    //       if (err) reject(err);
    //       resolve(series);
    //     });
    //   });
    // },
  },
};
module.exports = resolvers;
