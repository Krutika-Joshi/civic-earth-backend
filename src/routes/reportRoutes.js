const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const { createReport } = require("../controllers/reportController");

router.post("/", protect, createReport);

module.exports = router;