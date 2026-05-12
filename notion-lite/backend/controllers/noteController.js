const Note = require("../models/Note");//This note model talks to mongodb

// GET
const getNotes = async (req, res) => {
    const notes = await Note.find({
        user: req.user.id
    });
    res.json(notes);
};

// POST
const addNote = async (req, res) => {
    const newNote = new Note({
        ...req.body,
        user: req.user.id
    });
    await newNote.save();
    res.json(newNote);
};

// DELETE
const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete({
        _id: req.params.id,
        user: req.user.id
    });
    res.json({ message: "Deleted successfully" });
};

// UPDATE
const updateNote = async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(
        {
            _id: req.params.id,
            user: req.user.id
        },
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