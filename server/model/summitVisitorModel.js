const mongoose = require('mongoose');

const summitVisitorSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
  },
  companyOrPlace: {
    type: String,
    required: true,
    trim: true,
  },
  packageType: {
    type: String,
    enum: ["full_day", "half_day"],
    required: true,
  },
  packageAmount: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
    trim: true,
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
}, { timestamps: true });

const SummitVisitor = mongoose.model("SummitVisitor", summitVisitorSchema);

module.exports = SummitVisitor;
