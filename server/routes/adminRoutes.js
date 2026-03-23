const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/userController");
const { addStall } = require("../controllers/stallController");
const { createAward } = require("../controllers/awardController");
const { createBrandHonoring } = require("../controllers/brandHonoringController");
const { createBusinessPresentation } = require("../controllers/businessPresentationController");
const { createPanelDiscussion } = require("../controllers/panelDiscussionController");
const { createProductLaunch } = require("../controllers/productLaunchController");
const upload = require("../middleware/uploadMemory");

// Admin manual user creation endpoints (no payment, same logic as public endpoints)
router.post("/users/register", upload.single("photo"), addUser);
router.post("/stall/register", addStall);
router.post("/awards/create", createAward);
router.post("/brand-honoring/create", createBrandHonoring);
router.post("/business-presentation/create", createBusinessPresentation);
router.post("/panel-discussion/create", createPanelDiscussion);
router.post("/product-launch/create", createProductLaunch);

module.exports = router;
