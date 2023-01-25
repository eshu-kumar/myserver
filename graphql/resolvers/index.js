const _ = require("lodash");
// const review = require("./review");
// const discussion = require("./discussion");
const friend = require("./friend");
const series = require("./series");
const mergedResolvers = _.merge(friend, series);
module.exports = mergedResolvers;
