const express = require('express');
const app = express();

const port = 3000;


app.use('/user', (req, res,next)=>{
  res.send('This is first response');
  console.log("This is first rout handler");
next();
},
(req, res, next)=>{
  res.send('this is second response');
  console.log("This is second route handler");
  next();
},
(req, res, next)=>{
  console.log("this is second route handler");
  res.send("this is third route handler");
}
);


app.listen(port, () => {
  console.log(`Server is running on :${port}`);
} );