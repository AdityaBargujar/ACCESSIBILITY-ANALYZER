// backend/controllers/analyzeController.js
import fs from "fs";
import * as cheerio from "cheerio";
import axios from "axios";

export const analyzeFile = async (req, res) => {
  try {
    let fileContent = "";

    if (req.file) {
      // Case 1: File uploaded
      fileContent = fs.readFileSync(req.file.path, "utf8");
    } else if (req.body.url) {
      // Case 2: URL provided
      const response = await axios.get(req.body.url);
      fileContent = response.data;
    } else {
      return res.status(400).json({ error: "No file or URL provided" });
    }

    // Load HTML into Cheerio
    const $ = cheerio.load(fileContent);
    const issues = [];

    // ✅ Check 1: Missing alt attributes
    $("img").each((i, el) => {
      if (!$(el).attr("alt")) {
        issues.push(`Image #${i + 1} is missing an alt attribute.`);
      }
    });

    // ✅ Check 2: Inputs without labels
    $("input").each((i, el) => {
      const id = $(el).attr("id");
      if (id && $(`label[for='${id}']`).length === 0) {
        issues.push(`Input with id="${id}" has no label.`);
      }
    });

    // ✅ Check 3: Heading structure (optional improvement)
    let lastHeading = 0;
    $("h1, h2, h3, h4, h5, h6").each((i, el) => {
      const level = parseInt(el.tagName.replace("h", ""), 10);
      if (level - lastHeading > 1) {
        issues.push(`Heading <${el.tagName}> is out of order.`);
      }
      lastHeading = level;
    });

    // ✅ Build result
    const result = {
      score: Math.max(0, 100 - issues.length * 10), // simple scoring
      totalIssues: issues.length,
      issues: issues.length > 0 ? issues : ["No major issues found 🎉"],
      suggestions:
        issues.length > 0
          ? [
              "Add alt attributes to images.",
              "Add labels to inputs.",
              "Maintain proper heading order.",
            ]
          : ["Your page looks great! ✅"],
    };

    console.log("✅ Sending result:", result);
    res.json(result);
  } catch (error) {
    console.error("❌ Analysis failed:", error.message);
    res.status(500).json({ error: "Something went wrong during analysis." });
  }
};
