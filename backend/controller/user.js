const express = require("express");
const User = require("../model/user");
const router = express.Router();
const path = require("path");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
// const sendToken = require("../utils/jwtToken");

// Create user route
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename; // Use filename instead of fieldname
      const filepath = path.join(__dirname, "../uploads", filename); // Correct the file path

      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: "File deleted successfully" });
        }
      });

      return next(new ErrorHandler("User already exists", 400));
    }

    const fileUrl = `/uploads/${req.file.filename}`; // Corrected file URL
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // await User.create(user);
    const activationToken = createActivationToken(user);
    
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};


module.exports = router;
