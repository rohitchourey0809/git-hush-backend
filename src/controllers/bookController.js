import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate();
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const query = req.query.query || "";

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postBooks = async (req, res) => {
  try {
    const { title, author, genre, description, averageRating } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      description,
      averageRating,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const review = new Review({ bookId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sortbytitle = async (req, res) => {
  try {
    const { page = 1, sort = "title" } = req.query;
    const limit = 10; // Adjust as needed
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ [sort]: 1 }) // Sort by the specified field
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await Book.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      data: books,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

