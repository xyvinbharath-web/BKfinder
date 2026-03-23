const BusinessPresentation = require("../model/businessPresentationModel");

const createBusinessPresentation = async (req, res) => {
  try {
    const { name, phone, email, company, remarks } = req.body;

    if (!name || !phone || !email || !company) {
      return res.status(400).json({ message: "name, phone, email, company are required" });
    }

    const doc = await BusinessPresentation.create({
      name,
      phone,
      email,
      company,
      remarks: remarks || "",
    });

    return res.status(201).json({ message: "Business presentation registered successfully", data: doc });
  } catch (err) {
    console.error("Error creating business presentation:", err);
    return res.status(500).json({ message: "Failed to register business presentation" });
  }
};

const getBusinessPresentations = async (req, res) => {
  try {
    const docs = await BusinessPresentation.find().sort({ createdAt: -1 });
    return res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching business presentations:", err);
    return res.status(500).json({ message: "Failed to fetch business presentations" });
  }
};

module.exports = { createBusinessPresentation, getBusinessPresentations };
