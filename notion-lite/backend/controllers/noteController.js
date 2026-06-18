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

//STATS
const getStats = async (req, res) => {

    try {
        const userId = req.user.id;
        const notes = await Note.find({ user: userId });
        const totalNotes = notes.length;
        const pinnedNotes = notes.filter(n => n.pinned).length;
        const totalTags =  notes.reduce((count, note) => count + (note.tags?.length || 0),0);
        res.json({
            totalNotes,
            pinnedNotes,
            totalTags
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch stats"
        });
    }
};

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
    getStats
};