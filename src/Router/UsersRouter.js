const express = require("express");
const router = express.Router();
const upload = require("../Middleware/UploadMiddleware");
const { 
  registerUser, 
  loginUser, 
  adminGetAllUsers, 
  adminDeleteUser, 
  recruiterGetProfile, 
  recruiterUpdateProfile, 
  uploadPhoto 
} = require("../Controller/UserController");
const authMiddleware = require("../Middleware/UserMiddleware");

// Register & Login
router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);

// Admin
router.get("/admin/users", adminGetAllUsers);
router.delete("/admin/user/:id",adminDeleteUser);

// Recruiter
router.get("/recruiter/profile", authMiddleware(), recruiterGetProfile);
// router.put("/recruiter/profile", authMiddleware(), recruiterUpdateProfile);
router.put(
  "/recruiter/profile",
  authMiddleware(),        // make sure you call it if it’s a function
  upload.single("photo"),  // multer handles file
  recruiterUpdateProfile
);
// router.put(
//   "/recruiter/profile",
//   authMiddleware,          // for JWT check
//   upload.single("photo"),  // multer middleware
//   recruiterUpdateProfile
// );



module.exports = router;