const express = require("express");
const path = require("path");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename;
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
    } catch (error) {
        next(error);
    }
});

module.exports = router;
