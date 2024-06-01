const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
require("dotenv").config();

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api", bookRoutes);

const mongoUri =
  "mongodb+srv://rohit1995chourey:rohit321@nodeapp.r62ctns.mongodb.net/?retryWrites=true&w=majority&appName=NodeApp";
if (!mongoUri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
