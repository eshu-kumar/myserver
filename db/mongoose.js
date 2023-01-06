const mongoose = require("mongoose");
const mongoDbUrl = process.env.MONGO_DB_URL;
mongoose.set("strictQuery", false);
async function createConnection() {
  console.log("creating connection");
  try {
    await mongoose.connect(mongoDbUrl);
  } catch (error) {
    console.log(error);
  }
}
async function closeConnection() {
  console.log("closing connection");
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}
//not using this function but it is used for getting raw client connection the raw way of using mongodb
async function getClient() {
  const client = await MongoClient.connect(mongoDbUrl);
  return client;
}
module.exports = { createConnection, closeConnection };
