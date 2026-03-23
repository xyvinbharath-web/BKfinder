const Registration = require("../model/registrationModel");
const QRCode = require("qrcode");
const { upload_file_to_s3 } = require("../utils/s3_uploader");
const sharp = require("sharp");
const XLSX = require("xlsx");
const PaymentTransaction = require("../model/paymentTransactionModel");

const CLIENT_URL = "https://bkfinder.com";

// Package pricing constants
const PACKAGE_PRICING = {
  full_day: 2000,
  half_day: 999,
  evening_pass: 999,
};

const register = async (req, res) => {
  try {
    const { 
      category, 
      name, 
      phone, 
      email, 
      company, 
      packageType, 
      extraFields = {},
      eventName, 
      eventDate, 
      eventVenue 
    } = req.body;

    let parsedExtraFields = extraFields;
    if (typeof parsedExtraFields === "string") {
      try {
        parsedExtraFields = JSON.parse(parsedExtraFields);
      } catch (e) {
        parsedExtraFields = {};
      }
    }

    // Validate required fields
    if (!category || !name || !phone || !company) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: category, name, phone, company"
      });
    }

    if (category !== "visitor" && category !== "business_stall" && !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: email"
      });
    }

    // Validate category
    const validCategories = ['visitor', 'brand_honoring', 'business_stall', 'business_presentation', 'panel_discussion', 'product_launch'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration category"
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
      const s3Url = await upload_file_to_s3(req.file, "registrationPhotos");
      photoUrl = s3Url;
    }

    // Calculate package amount for visitor category
    let packageAmount = 0;
    if (category === 'visitor' && packageType && PACKAGE_PRICING[packageType]) {
      packageAmount = PACKAGE_PRICING[packageType];
    }

    const paymentId = req.body.paymentId || req.body.razorpay_payment_id || "";
    const orderId = req.body.orderId || req.body.razorpay_order_id || "";
    const signature = req.body.signature || req.body.razorpay_signature || "";
    const paymentDate = paymentId && orderId ? new Date() : null;
    const paymentStatus = category === "visitor" && paymentId && orderId ? "paid" : "admin_created";

    // Create new registration
    const registration = new Registration({
      category,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      company: company.trim(),
      packageType: category === 'visitor' ? packageType : null,
      packageAmount,
      extraFields: parsedExtraFields,
      photo: photoUrl,
      eventName: eventName || "1000 Brand Owners Business Summit 2026",
      eventDate: eventDate || "10 May 2026",
      eventVenue: eventVenue || "Capkon Convention Centre, NH66, Calicut",
      paymentStatus,
      paymentId,
      orderId,
      paymentAmount: packageAmount,
      paymentDate,
    });

    // Generate card URL and QR code only for visitor category
    if (category === 'visitor') {
      const cardUrl = `${CLIENT_URL}/card/${registration._id}`;
      registration.cardUrl = cardUrl;
      registration.qr = await QRCode.toDataURL(cardUrl);
    }

    // Save registration to database
    await registration.save();

    // Persist payment attempt details separately (success/pending)
    // If an order was created on /api/payment/order, it will already exist as pending.
    // Here we link the transaction with the created registration.
    try {
      if (orderId) {
        await PaymentTransaction.findOneAndUpdate(
          { orderId },
          {
            paymentId: paymentId || "",
            signature: signature || "",
            status: paymentId ? "paid" : "pending",
            category: category || "",
            packageType: category === "visitor" ? packageType || "" : "",
            registrationId: registration._id,
            customerName: name?.trim?.() || "",
            customerPhone: phone?.trim?.() || "",
            customerEmail: email ? email.trim() : "",
            providerPaymentPayload: paymentId
              ? {
                  paymentId,
                  orderId,
                  signature,
                }
              : {},
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch (txErr) {
      console.error("Failed to update PaymentTransaction:", txErr);
    }

    // Return response based on category
    const response = {
      success: true,
      message: category === 'visitor' 
        ? "Registration successful! Your event card has been generated."
        : "Registration successful! We will contact you soon.",
      id: registration._id,
      category: registration.category,
    };

    // Add card URL only for visitor category
    if (category === 'visitor') {
      response.cardUrl = registration.cardUrl;
    }

    res.status(201).json(response);

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete registration",
      error: error.message,
    });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = {};
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search by name or phone if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const registrations = await Registration.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      registrations: registrations,
    });

  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    res.status(200).json({
      success: true,
      registration: registration,
    });

  } catch (error) {
    console.error("Error fetching registration by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registration",
      error: error.message,
    });
  }
};

const exportRegistrations = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const registrations = await Registration.find(query).sort({ createdAt: -1 });
    
    // Prepare data for Excel export
    const data = registrations.map(reg => {
      const row = {
        'ID': reg._id.toString(),
        'Category': reg.category,
        'Name': reg.name,
        'Phone': reg.phone,
        'Email': reg.email,
        'Company': reg.company,
        'Package Type': reg.packageType || '',
        'Package Amount': reg.packageAmount,
        'Registration Date': new Date(reg.createdAt).toLocaleDateString(),
        'Payment Status': reg.paymentStatus,
      };

      // Add extra fields dynamically
      if (reg.extraFields && Object.keys(reg.extraFields).length > 0) {
        Object.keys(reg.extraFields).forEach(key => {
          row[key] = reg.extraFields[key] || '';
        });
      }

      return row;
    });

    // Create Excel workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=registrations_${category || 'all'}_${Date.now()}.xlsx`);

    // Send file
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.send(buffer);

  } catch (error) {
    console.error("Error exporting registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export registrations",
      error: error.message,
    });
  }
};

const getRegistrationStats = async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRegistrations = await Registration.countDocuments();
    const visitorRegistrations = await Registration.countDocuments({ category: 'visitor' });

    res.status(200).json({
      success: true,
      stats: stats,
      total: totalRegistrations,
      visitorTotal: visitorRegistrations,
    });

  } catch (error) {
    console.error("Error fetching registration stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registration stats",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  getAllRegistrations,
  getRegistrationById,
  exportRegistrations,
  getRegistrationStats,
};
