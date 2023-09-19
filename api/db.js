const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
    "mongodb+srv://digital_campus:digitalcampus@digitalcampus.my4j9fl.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "digitalcampus";

let db = null;
try {
    // Use connect method to connect to the server
    client.connect();
    console.log("Connected successfully to server");
} catch (err) {
    console.log(err);
}

db = client.db(dbName);

module.exports = db;
