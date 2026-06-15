const Express = require("express");

const {
  createNewJob,
  getAllJobsOptionallyFilerByCompanyId,
  getSingleJobDetails,
} = require("../controllers/jobControllers");

const router = Express.Router();

router.post("/new", createNewJob);
router.get("/", getAllJobsOptionallyFilerByCompanyId);
router.get("/:id", getSingleJobDetails);

module.exports = router;
