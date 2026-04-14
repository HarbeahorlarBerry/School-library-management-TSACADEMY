import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ===============================
// REGISTER USER
// ===============================
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// LOGIN USER
// ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};