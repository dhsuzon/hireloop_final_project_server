const {
  jobs,
  companies,
  userCollection,
  sessionCollection,
} = require("../config/db");

const verifyUserToken = async (req, res, next) => {
  const authHerder = req.headers?.authorization;

  if (!authHerder) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  const token = authHerder.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  const query = {
    token: token,
  };
  const session = await sessionCollection.findOne(query);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const userquery = {
    _id: session.userId,
  };

  const sessionUser = await userCollection.findOne(userquery);
  if (!sessionUser) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  req.user = sessionUser;

  next();
};

const verifySeeker = async (req, res, next) => {
  console.log("user", req.user);
  if (req.user?.role !== "seeker") {
    return res.status(403).json({ message: "Forbidden Access" });
  }
  next();
};

const verifyAdmin = async (req, res, next) => {
  console.log("user", req.user);
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden Access" });
  }
  next();
};
const verifyRecruiter = async (req, res, next) => {
  console.log("user", req.user);
  if (req.user?.role !== "recruiter") {
    return res.status(403).json({ message: "Forbidden Access" });
  }
  next();
};

module.exports = {
  verifyUserToken,
  verifySeeker,
  verifyAdmin,
  verifyRecruiter,
};
