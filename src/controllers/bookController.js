// controllers/bookController.js
const Book = require("../models/Book");
const Review = require("../models/Review");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate();
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
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

exports.postBooks = async (req, res) => {
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

exports.submitReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const review = new Review({ bookId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
