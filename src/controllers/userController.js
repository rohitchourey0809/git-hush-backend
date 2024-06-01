import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
 
  await user.save();
  res.status(201).json(user);
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
   console.log("user", user);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log("token", token);
  res.json({ token });
};

export const addFavoriteBook = async (req, res) => {
  const { bookId } = req.body;
  const user = await User.findById(req.user.id);

  if (!user.favorites.includes(bookId)) {
    user.favorites.push(bookId);
    await user.save();
  }

  res.status(200).json(user);
};
