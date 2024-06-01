import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const submitReview = async (req, res) => {
  const { bookId, rating, comment } = req.body;
  const userId = req.user.id;

  const review = new Review({ book: bookId, user: userId, rating, comment });
  await review.save();

  const book = await Book.findById(bookId);
  book.reviews.push(review._id);
  book.averageRating = (
    book.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    book.reviews.length
  ).toFixed(2);
  await book.save();

  res.status(201).json(review);
};
