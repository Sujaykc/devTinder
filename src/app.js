const express = require('express');
const app = express();
const {adminAuth} = require('../middlewares/auth');
const port = 3000;


app.get('/admin/getAllData', adminAuth, (req, res)=>{
  res.send("This is all user data");
})

app.post('/login', (req, res)=>{
  res.send("User logged in successfully");
})

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
} );