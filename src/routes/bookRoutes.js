import express from "express";
import { getBookById, getBooks, postBooks, searchBooks, sortbytitle } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/", sortbytitle);
router.post("/", postBooks);
router.get("/:id", getBookById);
router.get("/search", searchBooks);


export default router;
