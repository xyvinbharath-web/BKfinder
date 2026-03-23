const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");
const User = require("../model/userModel");

const router = express.Router();

/* helper: rounded left rectangle */
// function drawRoundedLeftRect(ctx, x, y, w, h, r) {
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w, y);
//   ctx.lineTo(x + w, y + h);
//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);
//   ctx.closePath();
// }

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* helper: load remote image */
const loadImageFromUrl = async (url) => {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  return loadImage(buf);
};

router.get("/image/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    const isVisitor = user.registrationType === "visitor";

    const WIDTH = 1080;
    const HEIGHT = 1350;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    /* BACKGROUND */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    /* FRAME */
    let framePath = path.join(__dirname, "../public/frame/frame.jpg");
    if (user.registrationType === "visitor") {
      const amount = Number(user.paymentAmount) || 0;
      const isFullDay = amount >= 2000;
      const frameFileName = isFullDay ? "visitor-pass-fullday.jpg" : "visitor-pass-half-day.jpg";

      const serverFramePath = path.join(__dirname, "../public/frame", frameFileName);
      const clientAssetPath = path.join(__dirname, "../../client/src/assets", frameFileName);

      framePath = fs.existsSync(serverFramePath) ? serverFramePath : clientAssetPath;
    }

    const frame = await loadImage(framePath);
    ctx.drawImage(frame, 0, 0, WIDTH, HEIGHT);

    /* USER PHOTO */
    if (user.photo) {
      const photo = await loadImageFromUrl(user.photo);
      const photoWidth = 360;
      const photoHeight = Math.round(photoWidth * 6 / 5);
      const photoX = Math.round((WIDTH - photoWidth) / 2);
      const photoY = user.registrationType === "visitor" ? 520 : 650;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 22);
      ctx.clip();
      ctx.drawImage(photo, photoX, photoY, photoWidth, photoHeight);
      ctx.restore();
    }

    /* NAME BOX  */

    const paddingX = isVisitor ? 32 : 28;
    const paddingY = isVisitor ? 28 : 26;
    const gap = isVisitor ? 18 : 14;

    // Center-align text for the name plate
    ctx.textAlign = "center";

    const displayName = (user.name || "").toUpperCase();
    // Line under the name:
    //  - visitors: show place (with Kochi fallback)
    //  - stall/award: prefer company name (cName), fallback to place/Kochi
    let lineText;
    if (user.registrationType === "stall" || user.registrationType === "award") {
      if (user.cName && user.cName.trim()) {
        lineText = user.cName;
      } else if (user.place && user.place.trim()) {
        lineText = user.place;
      } else {
        lineText = "Kochi";
      }
    } else {
      lineText = (user.place && user.place.trim()) ? user.place : "Kochi";
    }

    const displayPlace = (lineText || "Kochi").toUpperCase();

    let badgeText = "";
    if (user.registrationType === "award") {
      badgeText = "BUSINESS AWARD NOMINEE";
    } else if (user.registrationType === "stall") {
      badgeText = "STALL";
    } else {
      // visitor badge text removed because it's already on the frame
      badgeText = "";
    }

    /* NAME */
    ctx.font = isVisitor ? "bold 52px sans-serif" : "bold 40px sans-serif";

    const nameTextWidth = ctx.measureText(displayName).width;

    /* PLACE */
    ctx.font = isVisitor ? "40px sans-serif" : "36px sans-serif";
    const placeTextWidth = ctx.measureText(displayPlace).width;

    /* BADGE */
    ctx.font = "bold 30px sans-serif";

    const badgeTextWidth = ctx.measureText(badgeText).width;

    /* BOX SIZE (dynamic) */
    const contentWidth = Math.max(nameTextWidth, placeTextWidth, badgeTextWidth);
    const boxWidth = contentWidth + paddingX * 2;

    const boxHeight =
      paddingY * 2 +
      40 +
      (gap + 34) +
      (badgeText ? gap + 30 : 0);

    /* POSITION: horizontally centered; used as reference for text + QR */
    const boxX = (WIDTH - boxWidth) / 2;
    const boxY = isVisitor ? 540 : 480;

    /* DRAW NAME / PLACE / BADGE */
    ctx.fillStyle = "#000000";

    let currentY = boxY + paddingY + 40;

    // Name
    ctx.save();
    if (isVisitor) {
      ctx.fillStyle = "#7f1d1d";
      ctx.shadowColor = "rgba(127, 29, 29, 0.16)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.font = "bold 52px \"Trebuchet MS\", \"Segoe UI\", Arial, sans-serif";
    } else {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 40px sans-serif";
    }

    ctx.fillText(displayName, boxX + boxWidth / 2, currentY);
    ctx.restore();

    // Place (always render line between name and badge)
    currentY += gap + 48;
    if (isVisitor) {
      ctx.fillStyle = "#111827";
      ctx.font = "bold 38px \"Trebuchet MS\", \"Segoe UI\", Arial, sans-serif";
    } else {
      ctx.fillStyle = "#000000";
      ctx.font = "36px sans-serif";
    }

    ctx.fillText(displayPlace, boxX + boxWidth / 2, currentY);
    ctx.fillStyle = "#000000";

    // Badge line
    if (badgeText) {
      // add a bit more space below place before the badge
      currentY += gap + 40;

      const badgeFont = "bold 30px sans-serif";

      ctx.font = badgeFont;

      // Badge background box sized to text
      const badgePaddingX = 32;
      const badgePaddingY = 14;

      const badgeTextWidthForBox = ctx.measureText(badgeText).width;
      const badgeBoxWidth = badgeTextWidthForBox + badgePaddingX * 2;
      const badgeBoxHeight = 30 + badgePaddingY * 2;
      const badgeBoxX = (WIDTH - badgeBoxWidth) / 2;
      const badgeBoxY = currentY - 30 - badgePaddingY;

      // Themed background (green, matching card accents)
      ctx.fillStyle = "#0f766e"; // teal/green
      drawRoundedRect(ctx, badgeBoxX, badgeBoxY, badgeBoxWidth, badgeBoxHeight, 18);
      ctx.fill();

      // Badge text in white on top
      ctx.fillStyle = "#ffffff";
      ctx.fillText(badgeText, boxX + boxWidth / 2, currentY);

      // Restore fillStyle to black for anything drawn later
      ctx.fillStyle = "#000000";
    }

    /* QR */
    if (user.qr) {
      const qr = await loadImageFromUrl(user.qr);
      const qrSize = isVisitor ? 380 : 270;
      const qrX = (WIDTH - qrSize) / 2;
      const qrY = isVisitor ? boxY + boxHeight + 30 : boxY + boxHeight;
      ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
    }

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    res.send(canvas.toBuffer("image/png"));

  } catch (err) {
    console.error("CARD IMAGE ERROR:", err);
    res.status(500).send("Image generation failed");
  }
});

module.exports = router;