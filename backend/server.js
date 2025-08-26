import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.js"; // 👈 must include .js extension in ESM

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
