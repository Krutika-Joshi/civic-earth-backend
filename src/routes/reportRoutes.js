const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const { createReport, getReports } = require("../controllers/reportController");

//Create report
router.post("/", protect, createReport);

//View & filter reports
router.get("/", protect, getReports);

module.exports = router;