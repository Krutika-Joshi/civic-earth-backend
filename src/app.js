const express = require("express");
const authRoutes = require("./routes/authRoutes");
// const testRoutes = require("./routes/testRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// middleware to parse JSON
app.use(express.json());

//temporary test route
app.get("/", (req, res) => {
    res.send("Civic Earth Backend is running");
});

app.use("/api/auth", authRoutes);
// app.use("/api/test", testRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;