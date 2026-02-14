const express = require('express');
const app = express();
const {adminAuth} = require('../middlewares/auth');
const port = 3000;
const connectDB = require('../config/database');
const User = require('./models/userModel');

app.post('/signup', async (req, res)=>{
  const userData = new User({
    fullName : "Sujay",
    email : "sujay@gmail.com",
    password : "Sujay@03",
    age : 24,
    gender : "male"
  });

  try{
    userData.save();
    res.send("User data saved in the db");
  }catch(err){
    res.status(400).send("Storing user data is failed");
  }
})


 connectDB().then(()=>{
  console.log("MOngoDB connected succesfully");
  app.listen(port, ()=>{
    console.log("server connected successfully");
  })
 }).catch((err)=>{
  console.log("DB connection failed "+ err);
 })
 




