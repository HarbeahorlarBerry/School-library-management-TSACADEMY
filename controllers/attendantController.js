import Attendant from "../models/Attendant.js";

// ===============================
// CREATE ATTENDANT
// ===============================
export const createAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;

    if (!name || !staffId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Attendant.findOne({ staffId });

    if (exists) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    const attendant = await Attendant.create({ name, staffId });

    res.status(201).json(attendant);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET ALL ATTENDANTS (SEARCH + PAGINATION)
// ===============================
export const getAttendants = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { staffId: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const attendants = await Attendant.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Attendant.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      attendants
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};