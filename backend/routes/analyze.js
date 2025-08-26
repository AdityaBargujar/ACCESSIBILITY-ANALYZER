import express from "express";
import multer from "multer";
import { analyzeFile } from "../controllers/analyzeController.js"; // 👈 must include .js

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 👇 endpoint
router.post("/", upload.single("file"), analyzeFile);

export default router; // ✅ ESM export
