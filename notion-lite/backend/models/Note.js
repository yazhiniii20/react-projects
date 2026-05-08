const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  heading: String,
  contents: String,
  tags: [String],
  pinned: Boolean,
  createdAt: String,
  updatedAt: String
});

module.exports = mongoose.model("Note", noteSchema);