const { ObjectId } = require("mongodb");
const { jobs } = require("../config/db");

// Create a new job
const createNewJob = async (req, res) => {
  try {
    const jobInfo = req.body;
    const newjobInfo = {
      ...jobInfo,
      createAt: new Date(),
    };
    const result = await jobs.insertOne(newjobInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs (optionally filtered by companyId / status)
getAllJobsOptionallyFilerByCompanyId = async (req, res) => {
  try {
    const queryString = {};
    if (req.query.companyId) {
      queryString.companyId = req.query.companyId;
    }
    if (req.query.status) {
      queryString.status = req.query.status;
    }
    const result = await jobs.find(queryString).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single job
const getSingleJobDetails = async (req, res) => {
  const JobId = new ObjectId(req.params.id);
  const query = { _id: JobId };
  try {
    const result = await jobs.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewJob,
  getAllJobsOptionallyFilerByCompanyId,
  getSingleJobDetails,
};
