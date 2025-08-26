import express from "express";
import multer from "multer";
import { analyzeFile } from "../controllers/analyzeController.js";

const router = express.Router();

// File upload setup
const upload = multer({ dest: "uploads/" });

// Route for analysis
router.post("/", upload.single("file"), analyzeFile);

export default router;
