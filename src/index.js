import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes.js"; // Note: specify the file extension
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api", bookRoutes);

// Read MongoDB URI from environment variables
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err)); // Added error handling

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
