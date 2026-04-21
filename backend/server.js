const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (LOCAL)
mongoose.connect("mongodb://127.0.0.1:27017/notesapp")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));


// ✅ CREATE NOTE (POST)
app.post("/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ GET ALL NOTES
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ UPDATE NOTE
app.put("/notes/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ DELETE NOTE
app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});