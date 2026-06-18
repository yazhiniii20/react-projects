//This is the main entry point of the backend
const express = require('express'); //Imports express frameworks
const cors = require('cors'); //allows different ports to comminucate with each other
const mongoose = require("mongoose"); //helps node.js communicate with mongodb
require("dotenv").config();//loads .env variables
const app = express();//creates express application
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
//middleware
app.use(cors());//enables cors globally
app.use(express.json());//this converts incoming json to javascript object

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send("Backend is running ✅")
})

mongoose.connect(process.env.MONGO_URI)//connect backend to mongodb
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log(err));

app.use("/notes", noteRoutes); //all the note routes starts with /notes
app.use("/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT} ✅`);
})