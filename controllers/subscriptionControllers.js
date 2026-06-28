const { planSubscription, userCollection } = require("../config/db");

const createPlanSubscription = async (req, res) => {
  const subscriptionInfo = req.body;
  const newSubscriptionInfo = {
    ...subscriptionInfo,
    createAt: new Date(),
  };
  try {
    const result = await planSubscription.insertOne(newSubscriptionInfo);
    // update th user plan
    const filter = { email: subscriptionInfo.email };
    const updateDoc = {
      $set: {
        plan: subscriptionInfo.planId,
      },
    };

    const updateResult = await userCollection.updateOne(filter, updateDoc);

    return res.status(200).json(updateResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlanSubscription,
};
