const Series = require("../../models/series");
const series = {
  Query: {
    getSeries: async (root, args, context) => {
      try {
        const result = await Series.find({});
        return result;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addSeries: async (root, { series }, context) => {
      try {
        const { ...rest } = series;
        let newSeries = new Series({ ...rest });
        const result = await newSeries.save();
        return result;
      } catch (error) {
        console.log("error in graphql add series resolver", error);
        return error;
      }
    },
  },
};
module.exports = series;
