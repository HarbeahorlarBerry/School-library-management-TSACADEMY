import express from "express";
import {
  createAttendant,
  getAttendants
} from "../controllers/attendantController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// CREATE ATTENDANT (protected)
router.post("/", protect, createAttendant);

// GET ALL ATTENDANTS (protected)
router.get("/", protect, getAttendants);

export default router;