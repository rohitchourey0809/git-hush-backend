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

// Create a text index on the title and author field
BookSchema.index({ title: 'text', author: 'text' });


const Book = mongoose.model("hushbook", BookSchema);

export default Book;
