const { jobSeekarApplications } = require("../config/db");

const createJobSeekarApplication = async (req, res) => {
  const applicationInfo = req.body;
  const newApplicationInfo = {
    ...applicationInfo,
    createAt: new Date(),
  };
  try {
    const result = await jobSeekarApplications.insertOne(newApplicationInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJobSeekarApplication,
};
