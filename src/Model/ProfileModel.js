const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String, // store image file path
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
