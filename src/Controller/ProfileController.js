const Profile = require("../Model/ProfileModel");

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const { fullName, Role, company,email } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const newProfile = new Profile({
      fullName,
      Role,
      company,
      email,
      image: req.file ? req.file.filename : "", // multer saves file
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully", profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get single profile
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
      const { fullName, Role, company, email } = req.body;
  
      const updatedData = {
        fullName,
        Role,
        company,
        email,
      };
  
      if (req.file) {
        updatedData.image = req.file.filename;
      }
  
      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  };
  

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
