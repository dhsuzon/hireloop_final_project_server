const Express = require("express");

const {
  createNewCompany,
  getRecruiterComapany,
  getDbUserOrRecruiterFakeAPI,
  getRecruiterAllCompany,
  updateCompanyStatus,
} = require("../controllers/companyControllers");
const {
  verifyUserToken,
  verifyAdmin,
  verifyRecruiter,
} = require("../middleware/userVerifyMiddleware");

const router = Express.Router();

// router.get("/user", verifyUserToken, verifyAdmin, getDbUserOrRecruiterFakeAPI);
router.get("/all", verifyUserToken, verifyAdmin, getRecruiterAllCompany);

router.get("/", verifyUserToken, verifyRecruiter, getRecruiterComapany);
router.post("/", verifyUserToken, verifyRecruiter, createNewCompany);
router.patch("/:id", verifyUserToken, verifyAdmin, updateCompanyStatus);

module.exports = router;
