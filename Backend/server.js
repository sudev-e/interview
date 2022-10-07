require("dotenv").config();
require("./config/database").connect();
var express= require('express')
var app=express()
var mongoose= require('mongoose')
const { PORT } = process.env;
 
 
app.use(express.json());
app.use('/user',require("../Backend/routes/userRouter.js"))
app.use('/admin',require("../Backend/routes/userRouter.js"))
app.listen(PORT, ()=>{
    console.log("server started")
});