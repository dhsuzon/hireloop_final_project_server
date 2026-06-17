const Express = require("express");
const {
  createPlanSubscription,
} = require("../controllers/subscriptionControllers");

const router = Express.Router();

router.post("/new", createPlanSubscription);

module.exports = router;
