// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/books", bookController.getBooks);
router.post("/books", bookController.postBooks);
router.get("/books/:id", bookController.getBookById);
router.get("/search", bookController.searchBooks);
router.post("/reviews", bookController.submitReview);

module.exports = router;
