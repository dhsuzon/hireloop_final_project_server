const { plans } = require("../config/db");

const getPlanById = async (req, res) => {
  const query = {};
  if (req.query.planId) {
    query.id = req.query.planId;
  }
  try {
    const result = await plans.findOne(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getPlanById,
};
