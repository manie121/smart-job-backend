const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone Number required'],
        unique: true,
        match: [/^[6-9][0-9]{9}$/, 'Enter a valid 10 digit number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["Recruiter", "Admin"],
        required: true,
    },
    photo: {
        type: String, 
        //default: "default-profile.png"
    },
    companyName:{
        type:String,
        required:true,
    },
}, { timestamps: true });
const User = mongoose.model("UserModel", userSchema);
module.exports = User;