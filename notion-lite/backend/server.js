const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const noteRoutes = require("./routes/noteRoutes");

app.use(cors());
app.use(express.json());

const PORT = 5000;
app.get('/',(req,res)=>{
    res.send("Backend is running ✅")
})

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log(err));

app.use("/notes", noteRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT} ✅`);
})