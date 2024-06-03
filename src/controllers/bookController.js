import mongoose from "mongoose";
import Book from "../models/Book.js";

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



export const sortbytitle = async (req, res) => {
  try {
    const { page = 1, sort = "title" } = req.query;
    const limit = 5; // Adjust as needed
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

export const getBooks = async (req, res) => {
  // const books = await Book.find();
  const books = await Book.find();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(id).populate("reviews");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book by id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchBooks = async (req, res) => {
   const { query } = req.query;

   try {
     // Perform a case-insensitive search for books matching the query
     const books = await Book.find({
       $or: [
         { title: { $regex: query, $options: "i" } },
         { author: { $regex: query, $options: "i" } },
         { genre: { $regex: query, $options: "i" } },
       ],
     });

     res.json(books);
   } catch (error) {
     console.error("Error searching books:", error);
     res.status(500).json({ error: "Failed to search books" });
   }
};


export const markAsFavorite = async (req, res) => {
  const { id } = req.params;
  // const userId = req.user.id;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is already favorited by the user
    // const isFavorited = book.favorites.includes(userId);

    // if (isFavorited) {
    //   // Remove user from favorites
    //   book.favorites = book.favorites.filter(
    //     (favUserId) => favUserId.toString() !== userId
    //   );
    // } else {
      // Add user to favorites
      // book.favorites.push(userId);
    // }

    await book.save();

    res
      .status(200)
      .json({
        message: isFavorited
          ? "Book removed from favorites"
          : "Book added to favorites",
      });
  } catch (error) {
    console.error("Error marking book as favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const postFavourate = async (req, res) => {
  try {
    // Assuming the request body contains the favorite book data
    const favoriteBook = req.body;

    // You can process the favorite book data here, such as storing it in a database

    // Send a success response
    res
      .status(200)
      .json({ message: "Favorite book added successfully", favoriteBook });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavourite = async (req, res) => {
  try {
    // Retrieve favorite books from the database
    const favoriteBooks = await Book.find();
    res.json(favoriteBooks);
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    res.status(500).json({ error: "Failed to fetch favorite books" });
  }
};



export const searchandpagination = async (req, res) => {
  try {
    const { q, page = 1, limit = 5 } = req.query;
    const searchQuery = q ? { title: new RegExp(q, 'i') } : {};
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const books = await Book.find(searchQuery)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalBooks = await Book.countDocuments(searchQuery);
    res.json({
      books,
      total: totalBooks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
}