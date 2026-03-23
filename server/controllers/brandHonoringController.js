const BrandHonoring = require("../model/brandHonoringModel");

const createBrandHonoring = async (req, res) => {
  try {
    const { name, phone, email, company, remarks } = req.body;

    if (!name || !phone || !email || !company) {
      return res.status(400).json({ message: "name, phone, email, company are required" });
    }

    const doc = await BrandHonoring.create({
      name,
      phone,
      email,
      company,
      remarks: remarks || "",
    });

    return res.status(201).json({ message: "Brand honoring registered successfully", data: doc });
  } catch (err) {
    console.error("Error creating brand honoring:", err);
    return res.status(500).json({ message: "Failed to register brand honoring" });
  }
};

const getBrandHonorings = async (req, res) => {
  try {
    const docs = await BrandHonoring.find().sort({ createdAt: -1 });
    return res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching brand honorings:", err);
    return res.status(500).json({ message: "Failed to fetch brand honorings" });
  }
};

module.exports = { createBrandHonoring, getBrandHonorings };
