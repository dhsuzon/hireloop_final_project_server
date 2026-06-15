const Express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const jobsRouter = require("./routes/jobs");
const companiesRoute = require("./routes/companies");
const jobSeekarApplicationsRouter = require("./routes/jobSeekarApplications");

const app = Express();
app.use(Express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const Localhost = "localhost";

app.use("/api/jobs/", jobsRouter);
app.use("/api/my/companies/", companiesRoute);
app.use("/api/applications/", jobSeekarApplicationsRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

// Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
// Error Handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT, Localhost, () => {
  console.log(`server is running http://${Localhost}:${PORT}`);
});
