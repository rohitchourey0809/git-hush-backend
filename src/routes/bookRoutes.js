import express from "express";
import {
  getBookById,
  getBooks,
  getFavourite,
  markAsFavorite,
  postBooks,
  postFavourate,
  searchBooks,
  searchandpagination,
  sortbytitle,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/", sortbytitle);
router.post("/", postBooks);
router.get("/", searchandpagination);
router.post("/favorites", markAsFavorite);
router.post("/favorites", postFavourate);
router.get("/favorites", getFavourite);
router.get("/:id", getBookById);
router.get("/search", searchBooks);

export default router;
