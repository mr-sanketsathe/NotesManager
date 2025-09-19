const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const Note = require("./Models/NotesModel.js");
const User = require("./Models/UserModel.js");
const authRoute = require("./Routes/AuthRoute.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

// Delete all users (for testing)
app.get("/deleteUser", async (req, res) => {
  await User.deleteMany({});
  await Note.deleteMany({}); // optional: also clear notes
  res.send("All users and notes deleted");
});

// Get notes for a specific user
app.get("/api/notes", async (req, res) => {
  try {
    const userId = req.query.userId;
    const notes = await Note.find({ user: userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add new note for a user
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body; // get userId from frontend
    if (!userId) return res.status(400).json({ error: "User ID required" });

    const note = new Note({ title, content, tags, user: userId });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update note only if it belongs to the user
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // only allow update if note belongs to user
      { title, content, tags, updatedAt: Date.now() },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete note only if it belongs to the user
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    await Note.findOneAndDelete({ _id: req.params.id, user: userId });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Auth routes
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
