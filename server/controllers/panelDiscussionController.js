const PanelDiscussion = require("../model/panelDiscussionModel");

const createPanelDiscussion = async (req, res) => {
  try {
    const { name, phone, email, company, remarks } = req.body;

    if (!name || !phone || !email || !company) {
      return res.status(400).json({ message: "name, phone, email, company are required" });
    }

    const doc = await PanelDiscussion.create({
      name,
      phone,
      email,
      company,
      remarks: remarks || "",
    });

    return res.status(201).json({ message: "Panel discussion registered successfully", data: doc });
  } catch (err) {
    console.error("Error creating panel discussion:", err);
    return res.status(500).json({ message: "Failed to register panel discussion" });
  }
};

const getPanelDiscussions = async (req, res) => {
  try {
    const docs = await PanelDiscussion.find().sort({ createdAt: -1 });
    return res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching panel discussions:", err);
    return res.status(500).json({ message: "Failed to fetch panel discussions" });
  }
};

module.exports = { createPanelDiscussion, getPanelDiscussions };
