const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const targetUrl = `${clientUrl.replace(/\/$/, "")}/card/${id}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 1350,
      deviceScaleFactor: 2,
    });

    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    const pdf = await page.pdf({
      width: "1080px",
      height: "1350px",
      printBackground: true,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=card-${id}.pdf`,
    });

    res.send(pdf);
  } catch (error) {
    console.error("Card PDF generation failed:", error);
    res.status(500).json({
      message: "Failed to generate card PDF",
      hint: `Verify card page is reachable at ${targetUrl}`,
    });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // ignore
      }
    }
  }
});

module.exports = router;