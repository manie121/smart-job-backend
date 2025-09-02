const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, location, password,confirmPassword, role, companyName } = req.body;

    if (!fullName || !phoneNumber || !email || !location || !password || !role || !companyName ||!confirmPassword ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(password !== confirmPassword){
      return res.status(400).json({message:"password don't match"})
    }
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      phoneNumber,
      email,
      location,
      password: hashedPassword,
      role,
      companyName,
      confirmPassword,
      photo: req.file ? req.file.path : null
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== role) {
      return res.status(403).json({ message: `Access denied for role: ${role}` });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });

    res.status(200).json({ user, message: "Login successful", token, role: user.role });
  } catch (error) {
    console.log("Errpr",error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Admin – Get All Users
const adminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//Delete
const adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Recruiter – Get Profile
const recruiterGetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const path = require("path");

// Recruiter – Update Profile
const recruiterUpdateProfile = async (req, res) => {
    try {
      const { fullName, phoneNumber, location, companyName, role } = req.body;
  
      // Only update fields that are actually provided
      const updateFields = {};
      if (fullName) updateFields.fullName = fullName;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      if (location) updateFields.location = location;
      if (companyName) updateFields.companyName = companyName;
      if (role) updateFields.role = role;
  
      if (req.file) {
        // Store relative path instead of binary
        updateFields.photo = `uploads/${req.file.filename}`;
      }
  
      let updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateFields },
        { new: true }
      ).select("-password -confirmPassword"); // don’t return confirmPassword
  
      if (updatedUser?.photo) {
        updatedUser.photo = `${req.protocol}://${req.get("host")}/${updatedUser.photo}`;
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
  
  
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,   
      { photo: req.file.path },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Photo updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
  adminGetAllUsers,
  adminDeleteUser,
  recruiterGetProfile,
  recruiterUpdateProfile,
  uploadPhoto   
};