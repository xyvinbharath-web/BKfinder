const express = require("express");
const router = express.Router();
const { registerVisitor, getVisitors, getVisitorById } = require("../controllers/summitController");
const upload = require("../middleware/uploadMemory");

// Register summit visitor
router.post("/register", upload.single("photo"), registerVisitor);

// Get all summit visitors (for admin panel)
router.get("/attendees", getVisitors);

// Get visitor by ID
router.get("/attendees/:id", getVisitorById);

module.exports = router;
