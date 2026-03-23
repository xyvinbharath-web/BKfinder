const express = require("express");
const router = express.Router();
const { createBrandHonoring, getBrandHonorings } = require("../controllers/brandHonoringController");

router.post("/", createBrandHonoring);
router.get("/", getBrandHonorings);

module.exports = router;
