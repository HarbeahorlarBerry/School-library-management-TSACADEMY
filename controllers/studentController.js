import Student from "../models/Student.js";

// ===============================
// CREATE STUDENT
// ===============================
export const createStudent = async (req, res) => {
  try {
    const { name, email, studentId } = req.body;

    if (!name || !email || !studentId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Student.findOne({
      $or: [{ email }, { studentId }]
    });

    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({ name, email, studentId });

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET ALL STUDENTS (SEARCH + PAGINATION)
// ===============================
export const getStudents = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { studentId: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      students
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET SINGLE STUDENT
// ===============================
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};