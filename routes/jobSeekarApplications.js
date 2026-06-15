const Express = require("express");
const {
  createJobSeekarApplication,
} = require("../controllers/jobSeekarApplicationControllers");

const router = Express.Router();
router.post("/new", createJobSeekarApplication);

module.exports = router;
