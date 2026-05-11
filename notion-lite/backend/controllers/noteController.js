const Note = require("../models/Note");//This note model talks to mongodb

// GET
const getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

// POST
const addNote = async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json(newNote);
};

// DELETE
const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
};

// UPDATE
const updateNote = async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedNote);
};

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote
};