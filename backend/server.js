const app = require("./app");
const connectDatabase = require("./db/database");
const mongoose = require("mongoose");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for handling uncaught exception");
    console.error(err); // Log the error itself for better understanding
    process.exit(1); // Exit the process after handling the exception
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

// Connect to database
connectDatabase();

// Create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Promise Rejection: ${err.message}`);
    console.log("Shutting down the server for unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});