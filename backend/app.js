const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

// Import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

// Error Handling Middleware
app.use(ErrorHandler);

module.exports = app;
