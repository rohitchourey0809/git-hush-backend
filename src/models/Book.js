import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
});




const Book = mongoose.model("hushbook", BookSchema);

export default Book;
