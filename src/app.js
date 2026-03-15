const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('../config/database');
const User = require('./models/userModel');
const {validateSignUp} = require('./utils.js/validations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken, createToken} = require('./utils.js/token');
const { requireAuth } = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

app.post('/signUp', async(req, res)=>{
  try{
  validateSignUp(req);
  const {firstName, email, password, age, gender, about} = req.body;
const passwordHash = await bcrypt.hash(password, 10);

const userData = await new User({
  firstName, email, password : passwordHash, age, gender, about
});
const token = createToken({userData : userData._id}, process.env.JWT_SECRET);
userData.save();
  res.status(201).json({
    message : 'User regiseted successfully',
    data : userData,
    token
  });
  }catch(err){
    res.status(400).send('Error '+ err.message);
  } 
});

app.post('/login', async (req, res)=>{
  try{
const {email, password} = req.body;
  const user = await User.findOne({email:email});
  if(!user){
    throw new Error('Invalid credentials');
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if(isCorrectPassword)
{
  const token = jwt.sign({user : user._id}, process.env.JWT_SECRET);
   res.status(200).json({
    message : 'User logged in successfully',
    user,
    token : token
  });
}else{
  res.status(400).json({
    message : 'Invalid credential'
  });
}
 }catch(err){
res.status(404).send('Error : '+ err.message);
  }
});

app.get('/getUser', requireAuth, async (req, res)=>{
  const userEmail = req.body.email;
  const user = await User.find({email : userEmail});
  try{
    if(!user){
      res.status(404).send("user not found");
    }else{
    res.send(user);
    }
  }catch(err){
    res.status(404).send("user not found");
  }
})

app.get('/getAllUsers', requireAuth, async (req, res)=>{
  const user = await User.find();
  try{
 res.send(user);
  }catch(err){
res.status(404).send('user not found')
  }
})

app.patch('/:id', requireAuth, async (req, res) => {
  const allowed_updates = ["firstName", "age", "about", "gender"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every((k) => allowed_updates.includes(k));

  if (!isAllowed) {
    return res.status(400).send("Some of the input fields are not editable");
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/:id', requireAuth, async(req, res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.send("User deleted successfully");
    }
  }catch(err){
    res.status(404).send("User not found");
  }
});

connectDB().then(()=>{
  console.log("MongoDB connected successfully");
  app.listen(port, ()=>{
    console.log("Server connected successfully on "+ port);
  })
}).catch((err)=>{
  console.log("DB connection failed "+ err.message);
})





