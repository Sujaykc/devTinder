const express = require('express');
const app = express();
const {adminAuth} = require('../middlewares/auth');
const port = 3000;
const connectDB = require('../config/database');
const User = require('./models/userModel');


app.post('/signUP', (req, res)=>{
  const userData = new User({
    firstName : "Sujay",
    lastName : "gowda",
    age : 24,
    role : "backend developer",
    package : "12 lpa"
  })
  userData.save();
  res.send(userData);
})
connectDB().then(()=>{
  console.log("MongoDB connected successfully");
  app.listen(port, ()=>{
    console.log("Server connected successfully");
  })
}).catch((err)=>{
  console.log("DB connection failed "+ err.message);
})





