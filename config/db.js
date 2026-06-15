const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

const db = client.db("hireloop");
const jobs = db.collection("jobs");
const companies = db.collection("companies");
const userCollection = db.collection("user");
const jobSeekarApplications = db.collection("jobSeekarApplications");

module.exports = {
  connectDB,
  jobs,
  companies,
  userCollection,
  jobSeekarApplications,
};
