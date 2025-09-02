const express = require("express");
const router = express.Router();
const upload = require("../Middleware/UploadMiddleware");


const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../Controller/ProfileController");

// Create profile (with image upload)
router.post("/", upload.single("image"), createProfile);

// Get all profiles
router.get("/", getProfiles);

// Get single profile by ID
router.get("/:id", getProfileById);

// Update profile (with optional new image)
router.put("/:id", upload.single("image"), updateProfile);

// Delete profile
router.delete("/:id", deleteProfile);

module.exports = router;
