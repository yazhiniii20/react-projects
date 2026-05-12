const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  heading: String,
  contents: String,
  tags: [String],
  pinned: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
},{
  timestamps : true
});

module.exports = mongoose.model("Note", noteSchema);