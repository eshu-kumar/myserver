const { mergeTypeDefs } = require("@graphql-tools/merge");
const friend = require("./friend");
const series = require("./series");
const comment = require("./comment");
const review = require("./review");
const mergedTypeDefs = mergeTypeDefs([friend, series, comment, review]);
module.exports = mergedTypeDefs;
