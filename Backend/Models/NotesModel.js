const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ link note to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NotesSchema);
