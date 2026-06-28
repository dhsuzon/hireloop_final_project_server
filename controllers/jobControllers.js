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
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all jobs (optionally filtered by companyId / status)
getAllJobsOptionallyFilerByCompanyId = async (req, res) => {
  try {
    const queryString = {};

    if (req.query.search) {
      queryString.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ];
    }

    if (req.query.type) {
      queryString.type = req.query.type;
    }
    if (req.query.category) {
      queryString.category = req.query.category;
    }

    // companny related query
    if (req.query.companyId) {
      queryString.companyId = req.query.companyId;
    }
    if (req.query.status) {
      queryString.status = req.query.status;
    }

    if (req.query.page) {
      const page = req.query.page;
      const Limit = req.query.limit || 12;
      const Skip = (page - 1) * Limit;

      const totaljobs = await jobs.countDocuments(queryString);

      const perjobs = await jobs
        .find(queryString)
        .skip(Skip)
        .limit(Limit)
        .toArray();
      return res.status(200).json({ totaljobs, perjobs });
    }

    const result = await jobs.find(queryString).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get single job
const getSingleJobDetails = async (req, res) => {
  const JobId = new ObjectId(req.params.id);
  const query = { _id: JobId };
  try {
    const result = await jobs.findOne(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewJob,
  getAllJobsOptionallyFilerByCompanyId,
  getSingleJobDetails,
};
