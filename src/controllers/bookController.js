import Book from "../models/Book.js";
import Review from "../models/Review.js";

// export const searchBooks = async (req, res) => {
//   try {
//     const query = req.query.query || "";

//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { author: { $regex: query, $options: "i" } },
//         { genre: { $regex: query, $options: "i" } },
//       ],
//     });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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
  const books = await Book.find().populate("reviews");
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");

  // const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

export const searchBooks = async (req, res) => {
  try {
    const {
      query,
      page = 1,
      limit = 10,
      sortBy = "title",
      order = "asc",
    } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;

    const books = await Book.find({ $text: { $search: query } })
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

