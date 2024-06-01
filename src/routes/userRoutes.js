import express from "express";
import {
  registerUser,
  loginUser,
  addFavoriteBook,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/favorites", authMiddleware, addFavoriteBook);

export default router;
