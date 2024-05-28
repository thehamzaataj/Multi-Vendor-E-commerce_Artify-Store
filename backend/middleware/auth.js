const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

// module.exports = (theFunc) => (req, res, next) => {
//     Promise.resolve(theFunc(req, res, next)).catch(next);
// };
