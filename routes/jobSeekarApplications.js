const Express = require("express");
const {
  createJobSeekarApplication,
  getJobSeekarApplications,
} = require("../controllers/jobSeekarApplicationControllers");

const router = Express.Router();
router.post("/new", createJobSeekarApplication);
router.get("/", getJobSeekarApplications);

module.exports = router;
