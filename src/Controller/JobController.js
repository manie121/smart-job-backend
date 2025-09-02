const Job = require("../Model/JobModel");

// Create Job
const createJob = async (req, res) => {
  try {
    

    const {
      jobTitle,
      jobDescription,
      skills,
      qualification,
      minSalary,
      maxSalary,
      jobType,
      experienceLevel,
      location,
    } = req.body;

    // Validation
    if (
      !jobTitle ||
      !jobDescription ||
      !Array.isArray(skills) ||
      skills.length === 0 ||
      !qualification ||
      !minSalary ||
      !maxSalary ||
      !jobType ||
      !experienceLevel ||
      !location
    ) {
      return res
        .status(400)
        .json({
          message:
            "All fields are required and requiredSkills must be a non-empty array",
        });
    }

    // Create new job
    const newJob = await Job.create({
      jobTitle,
      jobDescription,
      skills,
      qualification,
      minSalary,
      maxSalary,
      jobType,
      experienceLevel,
      location,
      
    });

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // ensure schema validation
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,

};
