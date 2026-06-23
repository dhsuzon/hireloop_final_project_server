const { companies, userCollection } = require("../config/db");

const { ObjectId } = require("mongodb");

const createNewCompany = async (req, res) => {
  try {
    const { _id, ...companyInfo } = req.body;

    // Check if we are updating an existing company
    if (_id) {
      const result = await companies.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...companyInfo, updateAt: new Date() } },
        { upsert: true },
      );
      return res.status(200).json(result);
    }
    //  create  a new company
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
//  get the all company
const getRecruiterAllCompany = async (req, res) => {
  const result = await companies.find({}).toArray();
  res.status(200).json(result);
}; //  update company status
const updateCompanyStatus = async (req, res) => {
  const id = new ObjectId(req.params.id);
  updateInfo = req.body;
  const filter = { _id: id };
  const updateCompanyDoc = {
    $set: {
      status: updateInfo.status,
    },
  };
  try {
    const updateResult = await companies.updateOne(filter, updateCompanyDoc);
    res.status(200).json(updateResult);
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};

module.exports = {
  createNewCompany,
  getRecruiterComapany,
  getDbUserOrRecruiterFakeAPI,
  getRecruiterAllCompany,
  updateCompanyStatus,
};
