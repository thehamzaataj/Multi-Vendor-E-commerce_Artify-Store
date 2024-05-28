const app = require("./app");
const connectDatabase = require("./db/database");
const mongoose = require("mongoose");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling UNCAUGHT EXCEPTION! 💥`);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env",
    });
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Connect to database
connectDatabase();

// Create Server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandled promise rejection`);
  
    server.close(() => {
        process.exit(1);
    });
});
