const { mergeTypeDefs } = require("@graphql-tools/merge");
const review = require("./review");
const discussion = require("./discussion");
const mergedTypeDefs = mergeTypeDefs([review, discussion]);
module.exports = mergedTypeDefs;
