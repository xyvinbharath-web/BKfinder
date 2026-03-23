const express = require("express");
const router = express.Router();
const { register, getAllRegistrations, getRegistrationById, exportRegistrations, getRegistrationStats } = require("../controllers/registrationController");
const upload = require("../middleware/uploadMemory");

// Register (submit registration)
router.post("/", upload.single("photo"), register);

// Get all registrations with filtering
router.get("/", getAllRegistrations);

// Get registration by ID
router.get("/:id", getRegistrationById);

// Export registrations to Excel
router.get("/export/excel", exportRegistrations);

// Get registration statistics
router.get("/stats/overview", getRegistrationStats);

module.exports = router;
