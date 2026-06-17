const Express = require("express");
const { getPlanById } = require("../controllers/plansControllers");

const router = Express.Router();

router.get("/", getPlanById);

module.exports = router;
