const isEven = new Promise((resolve, reject) => {
  const num = 4;
  if(num % 2 === 0)
  {
    resolve("This is even number");
  }else{
    reject("This is odd number");
  }
});

isEven.then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.log(err);
});