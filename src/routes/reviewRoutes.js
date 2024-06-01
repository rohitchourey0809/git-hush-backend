import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { submitReview } from "../controllers/reviewController.js";
const router = express.Router();

router.post("/", authMiddleware, submitReview);

export default router;
