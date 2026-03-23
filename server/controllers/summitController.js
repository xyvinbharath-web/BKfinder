const SummitVisitor = require("../model/summitVisitorModel");
const QRCode = require("qrcode");
const { upload_file_to_s3 } = require("../utils/s3_uploader");
const sharp = require("sharp");

const CLIENT_URL = "https://bkfinder.com";

// Package pricing constants
const PACKAGE_PRICING = {
  full_day: 2000,
  half_day: 999,
};

const registerVisitor = async (req, res) => {
  try {
    const { name, phone, email, company, packageType, remarks, eventName, eventDate, eventVenue } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !company || !packageType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, phone, email, company, packageType"
      });
    }

    // Validate package type
    if (!PACKAGE_PRICING[packageType]) {
      return res.status(400).json({
        success: false,
        message: "Invalid package type. Must be 'full_day' or 'half_day'"
      });
    }

    // Handle photo upload
    let photoUrl = "";
    if (req.file) {
      // Convert HEIC/HEIF to JPEG if needed
      let bufferToUpload = req.file.buffer;
      const mime = req.file.mimetype;

      if (mime === "image/heic" || mime === "image/heif") {
        bufferToUpload = await sharp(req.file.buffer).jpeg({ quality: 90 }).toBuffer();
        req.file.originalname = req.file.originalname.replace(/\.[^/.]+$/, ".jpg");
        req.file.mimetype = "image/jpeg";
        req.file.buffer = bufferToUpload;
      }

      // Upload to S3
      const s3Url = await upload_file_to_s3(req.file, "summitPhotos");
      photoUrl = s3Url;
    }

    // Calculate package amount
    const packageAmount = PACKAGE_PRICING[packageType];

    // Create new summit visitor
    const visitor = new SummitVisitor({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      companyOrPlace: company.trim(),
      packageType,
      packageAmount,
      remarks: remarks ? remarks.trim() : "",
      photo: photoUrl,
      eventName: eventName || "1000 Brand Owners Business Summit 2026",
      eventDate: eventDate || "10 May 2026",
      eventVenue: eventVenue || "Capkon Convention Centre, NH66, Calicut",
    });

    // Generate card URL and QR code
    const cardUrl = `${CLIENT_URL}/card/${visitor._id}`;
    visitor.cardUrl = cardUrl;
    visitor.qr = await QRCode.toDataURL(cardUrl);

    // Save visitor to database
    await visitor.save();

    res.status(201).json({
      success: true,
      id: visitor._id,
      cardUrl: cardUrl,
    });

  } catch (error) {
    console.error("Error registering summit visitor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register visitor",
      error: error.message,
    });
  }
};

const getVisitors = async (req, res) => {
  try {
    const visitors = await SummitVisitor.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      visitors: visitors,
    });

  } catch (error) {
    console.error("Error fetching summit visitors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await SummitVisitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      visitor: visitor,
    });

  } catch (error) {
    console.error("Error fetching visitor by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitor",
      error: error.message,
    });
  }
};

module.exports = {
  registerVisitor,
  getVisitors,
  getVisitorById,
};
