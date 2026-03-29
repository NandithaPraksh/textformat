const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (we'll add real link later)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Schema
const textSchema = new mongoose.Schema({
  text: String,
  type: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Text = mongoose.model("Text", textSchema);

// Routes

// POST /format
app.post("/format", async (req, res) => {
  const { text, type } = req.body;

  let result = "";

  if (type === "uppercase") result = text.toUpperCase();
  else if (type === "lowercase") result = text.toLowerCase();
  else if (type === "reverse") result = text.split("").reverse().join("");

  const newEntry = new Text({ text, type, result });
  await newEntry.save();

  res.json({ result });
});

app.get("/", (req, res) => {
    res.send("API is working 🚀");

  });

  

// GET /history
app.get("/history", async (req, res) => {
  const data = await Text.find().sort({ createdAt: -1 });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});