const express = require("express");
const router = express.Router();
const {
  createProductLaunch,
  getProductLaunches,
} = require("../controllers/productLaunchController");

router.post("/", createProductLaunch);
router.get("/", getProductLaunches);

module.exports = router;
