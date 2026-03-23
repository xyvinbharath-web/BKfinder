const crypto = require("crypto");
const User = require("../model/userModel");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

const CLIENT_URL = process.env.CLIENT_URL || "https://bkfinder.com";

const registerGroup = async (req, res) => {
  try {
    const { primaryContact, members, payment, perMemberAmount } = req.body;

    if (!primaryContact || !primaryContact.name || !primaryContact.phone) {
      return res.status(400).json({ message: "primaryContact.name and primaryContact.phone are required" });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: "members must be a non-empty array" });
    }

    if (!payment || !payment.paymentId || !payment.orderId || !payment.signature) {
      return res.status(400).json({ message: "payment.paymentId, payment.orderId and payment.signature are required" });
    }

    const resolvedPerMemberAmount = Number(perMemberAmount) || 999;
    if (!Number.isFinite(resolvedPerMemberAmount) || resolvedPerMemberAmount <= 0) {
      return res.status(400).json({ message: "perMemberAmount must be a positive number" });
    }

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpaySecret) {
      return res.status(500).json({ message: "RAZORPAY_KEY_SECRET is not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${payment.orderId}|${payment.paymentId}`)
      .digest("hex");

    if (expectedSignature !== payment.signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const groupId = new mongoose.Types.ObjectId();
    const usersResponse = [];

    for (const member of members) {
      const newUser = new User({
        name: member?.name,
        phone: member?.phone,
        place: member?.place || "",
        registrationType: "visitor",
        paymentStatus: "paid",
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        paymentAmount: resolvedPerMemberAmount,
        paymentDate: new Date(),
        groupId,
        isGroupMember: true,
      });

      const cardUrl = `${CLIENT_URL}/card/${newUser._id}`;
      newUser.cardUrl = cardUrl;
      newUser.qr = await QRCode.toDataURL(cardUrl);

      await newUser.save();
      usersResponse.push({ id: newUser._id, cardUrl: newUser.cardUrl });
    }

    return res.status(201).json({
      success: true,
      groupId,
      users: usersResponse,
    });
  } catch (err) {
    console.error("Error registering group:", err);
    return res.status(500).json({ message: "Failed to register group" });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    const usersInGroup = await User.find({ groupId }).sort({ createdAt: 1 });

    if (!usersInGroup.length) {
      return res.status(404).json({ message: "Group booking not found" });
    }

    const users = usersInGroup.map((u) => ({
      id: u._id,
      name: u.name,
      cardUrl: u.cardUrl,
    }));

    return res.json({
      groupId,
      users,
    });
  } catch (err) {
    console.error("Error fetching group booking:", err);
    return res.status(500).json({ message: "Failed to fetch group tickets" });
  }
};

module.exports = {
  registerGroup,
  getGroupById,
};
