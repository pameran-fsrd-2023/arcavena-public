const { MongoClient } = require("mongodb");

const connectionString = process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

let db = null;

const MongoConnect = async () => {
  console.log("🛢️  MONGODB | connecting to", connectionString);
  try {
    await client.connect();
    const database = client.db("PameranFsrd2023");
    db = database;
    console.log("🛢️  MONGODB | connected to MongoDB");

    return database;
  } catch (err) {
    console.error("🛢️  MONGODB | Failed to connect to mongodb`");
    console.error(err);
    await client.close();
    return null;
  }
};

const MongoClose = async () => {
  try {
    console.log("🛢️  MONGODB | closing connection to MongoDB");
    await client.close();
  } catch (error) {
    console.log("🛢️  MONGODB | failed to close connection to MongoDB");
    console.error(err);
  }
};

const getDatabase = () => db;

module.exports = { MongoConnect, getDatabase, MongoClose };
