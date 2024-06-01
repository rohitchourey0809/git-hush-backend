// models/Book.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("hushbook", BookSchema);
