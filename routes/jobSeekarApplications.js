const Express = require("express");
const {
  createJobSeekarApplication,
  getJobSeekarApplications,
} = require("../controllers/jobSeekarApplicationControllers");
const {
  verifyUserToken,
  verifySeeker,
} = require("../middleware/userVerifyMiddleware");

const router = Express.Router();
router.post("/new", verifyUserToken, verifySeeker, createJobSeekarApplication);
router.get("/", verifyUserToken, verifySeeker, getJobSeekarApplications);

module.exports = router;
