import fs from "fs";
import * as cheerio from "cheerio";

export const analyzeFile = async (req, res) => {
  console.log("📩 Body:", req.body);
  console.log("📂 File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read uploaded HTML file
    const fileContent = fs.readFileSync(req.file.path, "utf8");
    const $ = cheerio.load(fileContent);

    const issues = [];

    // ✅ Check missing alt attributes
    $("img").each((i, el) => {
      if (!$(el).attr("alt")) {
        issues.push(`Image #${i + 1} is missing an alt attribute.`);
      }
    });

    // ✅ Check missing labels for inputs
    $("input").each((i, el) => {
      const id = $(el).attr("id");
      if (id && $(`label[for='${id}']`).length === 0) {
        issues.push(`Input with id="${id}" has no label.`);
      }
    });

    // ✅ Simple scoring system
    const result = {
      score: Math.max(0, 100 - issues.length * 10),
      totalIssues: issues.length,
      issues: issues.length > 0 ? issues : ["No major issues found 🎉"],
      suggestions:
        issues.length > 0
          ? [
              "Add alt attributes to images.",
              "Ensure all form inputs have labels.",
              "Maintain correct heading order.",
            ]
          : ["Your page looks accessible! ✅"],
    };

    console.log("✅ Sending result:", result);

    // ✅ Send JSON back to frontend
    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Analysis failed:", error);
    return res.status(500).json({ error: "Something went wrong during analysis." });
  }
};
