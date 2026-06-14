const Express = require("express");
const { companies, userCollection } = require("../config/db");

const router = Express.Router();

// get a user(Fake api)
router.get("/user", async (req, res) => {
  const result = await userCollection.find({}).skip(1).toArray();
  res.status(200).json(result);
});
// get a company(Fake api)
router.get("/companies", async (req, res) => {
  const result = await companies.find({}).toArray();
  res.status(200).json(result);
});

// get a my company
router.get("/", async (req, res) => {
  const query = {};
  if (req.query.recruiterId) {
    query.recruiterId = req.query.recruiterId;
  }
  try {
    const result = await companies.findOne(query);
    res.status(200).json(result || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// post a company
router.post("/", async (req, res) => {
  try {
    const companyInfo = req.body;

    const newCompanyInfo = {
      ...companyInfo,
      createAt: new Date(),
    };
    const result = await companies.insertOne(newCompanyInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
