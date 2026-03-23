const ProductLaunch = require("../model/productLaunchModel");

const createProductLaunch = async (req, res) => {
  try {
    const { name, phone, email, company, remarks } = req.body;

    if (!name || !phone || !email || !company) {
      return res.status(400).json({ message: "name, phone, email, company are required" });
    }

    const doc = await ProductLaunch.create({
      name,
      phone,
      email,
      company,
      remarks: remarks || "",
    });

    return res.status(201).json({ message: "Product launch registered successfully", data: doc });
  } catch (err) {
    console.error("Error creating product launch:", err);
    return res.status(500).json({ message: "Failed to register product launch" });
  }
};

const getProductLaunches = async (req, res) => {
  try {
    const docs = await ProductLaunch.find().sort({ createdAt: -1 });
    return res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching product launches:", err);
    return res.status(500).json({ message: "Failed to fetch product launches" });
  }
};

module.exports = { createProductLaunch, getProductLaunches };
