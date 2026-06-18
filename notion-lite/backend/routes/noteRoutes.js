const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
//import controllers
//routes only decide url,http method --  the logic is handled by controllers
const {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
    getStats
} = require("../controllers/noteController");

router.get("/", authMiddleware,getNotes);

router.get("/stats",authMiddleware,getStats);

router.post("/", authMiddleware,addNote);

router.delete("/:id",authMiddleware, deleteNote);

router.put("/:id", authMiddleware, updateNote);

module.exports = router;