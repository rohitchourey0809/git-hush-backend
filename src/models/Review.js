import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "hushbooks", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
