const express = require("express");
const router = express.Router();
const {
  createBusinessPresentation,
  getBusinessPresentations,
} = require("../controllers/businessPresentationController");

router.post("/", createBusinessPresentation);
router.get("/", getBusinessPresentations);

module.exports = router;
