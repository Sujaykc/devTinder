const validator = require('validator');


const validateSignUp = ((req)=>{
  const {firstName, email, password, age, gender} = req.body;
if(!firstName || !email || !password){
  throw new Error('Please enter all required fields');
}else if(firstName.length<=2 || firstName.length>=50)
{
  throw new Error('Please enter a valid full name');
}else if(!validator.isEmail(email)){
  throw new Error('Please enter a valid email');
}else if(!validator.isStrongPassword(password))
{
  throw new Error("Please enter a valid password format");
}
});

module.exports = {validateSignUp};