const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.get('/',(req,res)=>{
    res.send("Backend is running ✅")
})
let notes = [];
app.get("/notes",(req,res)=>{
    res.json(notes);
})
app.post("/notes",(req,res)=>{
    const newNote = {
        id : Date.now(),
        ...req.body
    };
    notes.push(newNote);
    res.json(newNote);
})
app.delete("/notes/:id",(req,res)=>{
    const id = Number(req.params.id);
    notes = notes.filter(n => n.id !== id);
    res.json({message:"Deleted successfully"});
})
app.put("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.map(n => {
        if (n.id === id) {
            return { ...n, ...req.body };
        }
        return n;
    });

    res.json({ message: "Updated successfully" });
});
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT} ✅`);
})