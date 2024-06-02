import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const submitReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    // const userId = req.user.id;

    // Create a new review
    const review = new Review({ bookId,  rating, comment });
    console.log("review", review);
    await review.save();

    // Find the book by ID
    const book = await Book.findById(req.body.bookId).populate("reviews");
    console.log("book", book);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Add the review to the book's reviews array
    book.reviews.push(review._id);

    // Calculate the new average rating
    const totalRatings = book.reviews.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    book.averageRating = totalRatings / book.reviews.length || 0; // Ensure it's a number, handle division by zero

    // Save the updated book
    await book.save();

    // Return the new review
    res.status(201).json(review);
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};
