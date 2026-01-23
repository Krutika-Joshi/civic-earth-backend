const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const { createReport, getReports, getSingleReport, updateReportStatus } = require("../controllers/reportController");

//Create report
router.post("/", protect, createReport);

//View & filter reports
router.get("/", protect, getReports);

//view single report
router.get("/:id", protect, getSingleReport);

//update report status
router.patch("/:id/status", protect, updateReportStatus);

module.exports = router;