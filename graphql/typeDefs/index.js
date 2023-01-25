const { mergeTypeDefs } = require("@graphql-tools/merge");
const review = require("./review");
const discussion = require("./discussion");
const mergedTypeDefs = mergeTypeDefs([review, discussion]);
console.log("merged typedefs", mergedTypeDefs.definitions[0].name);
console.log("merged typedefs fields", mergedTypeDefs.definitions[1].fields);
module.exports = mergedTypeDefs;
