export const validateBook = (req, res, next) => {
  const { title, authors } = req.body;

  // check title
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  // check authors exists
  if (!authors) {
    return res.status(400).json({ message: "Authors are required" });
  }

  // ensure authors is an array
  if (!Array.isArray(authors)) {
    return res.status(400).json({ message: "Authors must be an array" });
  }

  // ensure at least one author
  if (authors.length === 0) {
    return res.status(400).json({ message: "At least one author required" });
  }

  next();
};