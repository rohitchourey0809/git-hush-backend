import express from "express";
import * as bookController from "../controllers/bookController.js"; // Note: specify the file extension

const router = express.Router();

router.get("/books", bookController.getBooks);
router.get("/books", bookController.sortbytitle);
router.post("/books", bookController.postBooks);
router.get("/books/:id", bookController.getBookById);
router.get("/search", bookController.searchBooks);
router.post("/reviews", bookController.submitReview);

export default router;
