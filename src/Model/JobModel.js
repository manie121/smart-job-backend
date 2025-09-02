const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job Title is required"],
    },
    jobDescription: {
      type: String,
      required: [true, "Job Description is required"],
    },
    skills: {
      type: [String], // array of skills
      required: [true, "Required skills are needed"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
    },
    minSalary: {
      type: Number,
      required: [true, "Minimum salary is required"],

    },
    maxSalary: {
      type: Number,
      required: [true, "Maximum salary is required"],
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      required: [true, "Job type is required"],
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-level", "Senior", "Lead"],
      required: [true, "Experience level is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("JobModel", jobSchema);
module.exports = Job;
