const mongoose = require("mongoose");

const paymentTransactionSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      default: "razorpay",
    },
    orderId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    paymentId: {
      type: String,
      default: "",
      index: true,
    },
    signature: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      default: "INR",
    },
    amount: {
      type: Number,
      required: true,
    },
    amountInPaise: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "pending", "paid", "failed"],
      default: "created",
      index: true,
    },
    category: {
      type: String,
      default: "",
      index: true,
    },
    packageType: {
      type: String,
      default: "",
    },
    customerName: {
      type: String,
      default: "",
    },
    customerPhone: {
      type: String,
      default: "",
    },
    customerEmail: {
      type: String,
      default: "",
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      default: null,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    providerOrderPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    providerPaymentPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const PaymentTransaction = mongoose.model("PaymentTransaction", paymentTransactionSchema);

module.exports = PaymentTransaction;
