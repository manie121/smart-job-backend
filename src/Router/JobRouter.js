const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require("../Controller/JobController");

// Create job
router.post("/create", createJob);

// Get all jobs
router.get("/all", getAllJobs);

// Delete job by ID
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);

module.exports = router;

