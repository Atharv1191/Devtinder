const express = require("express");
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./config/database")

dotenv.config()
connectDB()

app.use('/',(req,res)=>{
    res.send("hello")
})

app.listen(4000,()=>{
    console.log("server is running at port 4000");
})
