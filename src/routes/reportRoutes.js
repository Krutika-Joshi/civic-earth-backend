const express = require("express");
const router = express.Router();

const { protect, authorizeRoles }  = require("../middlewares/authMiddleware");
const { createReport, getReports, getSingleReport, updateReportStatus, assignAuthority } = require("../controllers/reportController");

//Create report
router.post("/", protect, createReport);

//View & filter reports
router.get("/", protect, getReports);

//view single report
router.get("/:id", protect, getSingleReport);

//update report status
router.patch("/:id/status", protect, updateReportStatus);

router.post("/:id/assign", protect, authorizeRoles("admin", "moderator"), assignAuthority);

module.exports = router;