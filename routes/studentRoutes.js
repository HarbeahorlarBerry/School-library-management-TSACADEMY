import express from "express";
import {
  createStudent,
  getStudents,
  getStudent
} from "../controllers/studentController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// CREATE STUDENT (protected)
router.post("/", protect, createStudent);

// GET ALL STUDENTS (protected)
router.get("/", protect, getStudents);

// GET SINGLE STUDENT (protected)
router.get("/:id", protect, getStudent);

export default router;