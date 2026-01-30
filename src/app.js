const express = require('express');
const app = express();

const port = 3000;


app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/user1", (req, res) => {
  res.send("firstName: John, lastName: Doe");
});
app.post("/test", (req, res) => {
  res.send("POST request received");
});

app.delete('/delete', (req, res)=>{
  res.send("Data deleted succufully.");
  });

  app.post(/ab+cd/, (req, res)=>{
    console.log("Route patterns");
    res.send("this is route patterns")
});
app.get('/user/:id', (req, res)=>{
  res.send(req.params);
});

app.get('/user', (req, res)=>{
  res.send({"firstName" : 'Sujay', 'lastName' : 'kc'});
})




app.listen(port, () => {
  console.log(`Server is running on :${port}`);
} );