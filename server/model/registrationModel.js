const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['visitor', 'brand_honoring', 'business_stall', 'business_presentation', 'panel_discussion', 'product_launch']
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  packageType: {
    type: String,
    enum: ['full_day', 'half_day', 'evening_pass'],
    default: null,
  },
  packageAmount: {
    type: Number,
    default: 0,
  },
  extraFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  photo: {
    type: String,
    default: "",
  },
  qr: {
    type: String,
    default: "",
  },
  cardUrl: {
    type: String,
    default: "",
  },
  eventName: {
    type: String,
    default: "1000 Brand Owners Business Summit 2026",
  },
  eventDate: {
    type: String,
    default: "10 May 2026",
  },
  eventVenue: {
    type: String,
    default: "Capkon Convention Centre, NH66, Calicut",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "admin_created", "unpaid"],
    default: "admin_created"
  },
  paymentId: {
    type: String,
    default: "",
  },
  orderId: {
    type: String,
    default: "",
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  paymentDate: {
    type: Date,
  }
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
