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

const database = client.db("hireloop");
const jobs = database.collection("jobs");
const companies = database.collection("companies");
const userCollection = database.collection("user");
const jobSeekarApplications = database.collection("jobSeekarApplications");
const plans = database.collection("plans");
const planSubscription = database.collection("planSubscription");
const sessionCollection = database.collection("session");

module.exports = {
  connectDB,
  jobs,
  companies,
  userCollection,
  jobSeekarApplications,
  plans,
  planSubscription,
  sessionCollection,
};
