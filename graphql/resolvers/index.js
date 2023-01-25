const _ = require("lodash");
const comment = require("./comment");
const review = require("./review");
const friend = require("./friend");
const series = require("./series");
const mergedResolvers = _.merge(friend, series, comment, review);
module.exports = mergedResolvers;
