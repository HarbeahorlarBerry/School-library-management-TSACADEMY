import Author from "../models/Author.js";

// ===============================
// CREATE AUTHOR
// ===============================
export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const author = await Author.create({ name, bio });

    res.status(201).json(author);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET ALL AUTHORS (SEARCH + PAGINATION)
// ===============================
export const getAuthors = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { bio: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const authors = await Author.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Author.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      authors
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET SINGLE AUTHOR
// ===============================
export const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// UPDATE AUTHOR
// ===============================
export const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// DELETE AUTHOR
// ===============================
export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json({ message: "Author deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: message.error });
  }
};