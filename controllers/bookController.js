import Book from "../models/Book.js";
import Author from "../models/Author.js";

// ===============================
// CREATE BOOK
// ===============================
export const createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    if (!title || !authors || authors.length === 0) {
      return res.status(400).json({ message: "Title and authors required" });
    }

    const validAuthors = await Author.find({ _id: { $in: authors } });

    if (validAuthors.length !== authors.length) {
      return res.status(400).json({ message: "One or more authors not found" });
    }

    if (isbn) {
      const exists = await Book.findOne({ isbn });

      if (exists) {
        return res.status(400).json({ message: "ISBN already exists" });
      }
    }

    const book = await Book.create({ title, isbn, authors });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET ALL BOOKS (SEARCH + PAGINATION + AUTHOR SEARCH)
// ===============================
export const getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    // find authors matching search
    const authors = await Author.find({
      name: { $regex: search, $options: "i" }
    });

    const authorIds = authors.map(a => a._id);

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { authors: { $in: authorIds } }
          ]
        }
      : {};

    const books = await Book.find(query)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET SINGLE BOOK + OVERDUE CHECK
// ===============================
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const isOverdue =
      book.status === "OUT" &&
      book.returnDate &&
      new Date(book.returnDate) < new Date();

    res.json({
      book,
      isOverdue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// UPDATE BOOK
// ===============================
export const updateBook = async (req, res) => {
  try {
    const { authors, isbn } = req.body;

    if (authors) {
      const validAuthors = await Author.find({ _id: { $in: authors } });

      if (validAuthors.length !== authors.length) {
        return res.status(400).json({ message: "Invalid authors provided" });
      }
    }

    if (isbn) {
      const exists = await Book.findOne({
        isbn,
        _id: { $ne: req.params.id }
      });

      if (exists) {
        return res.status(400).json({ message: "ISBN already exists" });
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// DELETE BOOK
// ===============================
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// BORROW BOOK
// ===============================
export const borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    if (!studentId || !attendantId || !returnDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    res.json({
      message: "Book borrowed successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// RETURN BOOK
// ===============================
export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({ message: "Book already returned" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json({
      message: "Book returned successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};