import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} from "../controllers/authorController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// CREATE AUTHOR (protected)
router.post("/", protect, createAuthor);

// GET ALL AUTHORS (public or protected — here protected for consistency)
router.get("/", protect, getAuthors);

// GET SINGLE AUTHOR
router.get("/:id", protect, getAuthor);

// UPDATE AUTHOR
router.put("/:id", protect, updateAuthor);

// DELETE AUTHOR
router.delete("/:id", protect, deleteAuthor);

export default router;