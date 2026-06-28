const { jobSeekarApplications } = require("../config/db");

// create a job seekar applications
const createJobSeekarApplication = async (req, res) => {
  const applicationInfo = req.body;
  const newApplicationInfo = {
    ...applicationInfo,
    createAt: new Date(),
  };
  try {
    const result = await jobSeekarApplications.insertOne(newApplicationInfo);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getJobSeekarApplications = async (req, res) => {
  const query = {};
  if (req.query.applicantId) {
    query.applicantId = req.query.applicantId;

    // console.log(req.user, req.query.applicantId);
    if (req.user?._id.toString() !== req.query.applicantId) {
      return res.status(403).json({ message: "Forbidden Access" });
    }
  }

  if (req.query.jobId) {
    query.jobId = req.jobId;
  }
  try {
    const result = await jobSeekarApplications.find(query).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJobSeekarApplication,
  getJobSeekarApplications,
};
