import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} from "../controllers/bookController.js";

import { protect } from "../middleware/auth.js";
import { validateBook } from "../middleware/validate.js";

const router = express.Router();

// ===============================
// CRUD BOOKS (PROTECTED)
// ===============================
router.post("/", protect, validateBook, createBook);

router.get("/", protect, getBooks);

router.get("/:id", protect, getBook);

router.put("/:id", protect, updateBook);

router.delete("/:id", protect, deleteBook);

// ===============================
// BORROW & RETURN (VERY IMPORTANT)
// ===============================
router.post("/:id/borrow", protect, borrowBook);

router.post("/:id/return", protect, returnBook);

export default router;