const { companies, userCollection } = require("../config/db");

//  create a new company
const createNewCompany = async (req, res) => {
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
};
//  get recruiter related comapny
const getRecruiterComapany = async (req, res) => {
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
};
//   get all db recruiter
const getDbUserOrRecruiterFakeAPI = async (req, res) => {
  const result = await userCollection.find({}).skip(1).toArray();
  res.status(200).json(result);
};

const getDbRecruiterAllCompanyFakeAPI = async (req, res) => {
  const result = await companies.find({}).toArray();
  res.status(200).json(result);
};
module.exports = {
  createNewCompany,
  getRecruiterComapany,
  getDbUserOrRecruiterFakeAPI,
  getDbRecruiterAllCompanyFakeAPI,
};
