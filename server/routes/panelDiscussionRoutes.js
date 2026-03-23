const express = require("express");
const router = express.Router();
const {
  createPanelDiscussion,
  getPanelDiscussions,
} = require("../controllers/panelDiscussionController");

router.post("/", createPanelDiscussion);
router.get("/", getPanelDiscussions);

module.exports = router;
