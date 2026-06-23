const Express = require("express");

const {
  createNewCompany,
  getRecruiterComapany,
  getDbUserOrRecruiterFakeAPI,
  getRecruiterAllCompany,
  updateCompanyStatus,
} = require("../controllers/companyControllers");

const router = Express.Router();

router.get("/user", getDbUserOrRecruiterFakeAPI);
router.get("/all", getRecruiterAllCompany);

router.get("/", getRecruiterComapany);
router.post("/", createNewCompany);
router.patch("/:id", updateCompanyStatus);

module.exports = router;
