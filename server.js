import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import cors from "cors";
import connectDB from "./config/db.js";

import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendantRoutes from "./routes/attendantRoutes.js";

// Load env variables FIRST
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (VERY USEFUL for debugging)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Library API is running 🚀"
  });
});

// Routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/attendants", attendantRoutes);

// 404 handler (IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (OPTIONAL but strong)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server error"
  });
});

// Use env port or fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});