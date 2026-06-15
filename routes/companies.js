const Express = require("express");

const {
  createNewCompany,
  getRecruiterComapany,
  getDbUserOrRecruiterFakeAPI,
  getDbRecruiterAllCompanyFakeAPI,
} = require("../controllers/companyControllers");

const router = Express.Router();

router.get("/user", getDbUserOrRecruiterFakeAPI);
router.get("/companies", getDbRecruiterAllCompanyFakeAPI);

router.get("/", getRecruiterComapany);
router.post("/", createNewCompany);

module.exports = router;
