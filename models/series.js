const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema({
  seriesName: {
    type: String,
  },
  year: {
    type: Number,
  },
  rating: {
    type: String,
  },
});

const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;
