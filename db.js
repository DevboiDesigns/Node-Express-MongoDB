const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://krstos:peR9jyOMnRuc3Gfa@cluster0.ia7ffaz.mongodb.net/JS-Social-Media-App?retryWrites=true&w=majority"
);

async function start() {
  await client.connect();
  module.exports = client.db();
  const app = require("./app");
  app.listen(3000);
}

start();
