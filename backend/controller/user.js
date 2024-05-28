const express = require("express");
const path = require("path");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const router = express.Router();

router.post("/create-user", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (!name || !email || !password || !req.file) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    console.log("Uploaded file:", filename);  // Debug log

    const fileUrl = `/uploads/${filename}`;

    const user = new User({
        name,
        email,
        password,
        avatar: fileUrl,
    });

    await user.save();

    res.status(201).json({
        success: true,
        message: "User created successfully",
    });
}));

module.exports = router;
