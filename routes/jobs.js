const Express = require("express");

const {
  createNewJob,
  getAllJobsOptionallyFilerByCompanyId,
  getSingleJobDetails,
} = require("../controllers/jobControllers");
const {
  verifyUserToken,
  verifyRecruiter,
} = require("../middleware/userVerifyMiddleware");

const router = Express.Router();

router.post("/new", verifyUserToken, verifyRecruiter, createNewJob);
router.get("/", getAllJobsOptionallyFilerByCompanyId);
router.get("/:id", getSingleJobDetails);

module.exports = router;
