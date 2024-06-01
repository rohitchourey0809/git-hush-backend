import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  averageRating: { type: Number, default: 0 },
});

const Book = mongoose.model("hushbooks", BookSchema);

export default Book;
