const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  firstName : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    validate(value){
      if(!validator.isEmail(value))
      {
        throw new Error("please provide valid email id "+ value);
      }
    }
  },
  password : {
    type : String,
    required : true,
    minLength : 8,
    validate(value){
      if(!validator.isStrongPassword(value))
      {
        throw new Error("Please set strong password");
      }
    }
  },
  age : {
    type : Number
  },
  gender : {
    type : String,
      validate(value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error('please provide valid gender');
      }
    }
  },
  about :{
    type : String,
    default : "This is a defualt value",
  
  }
}, {
  timestamps : true
});

module.exports = mongoose.model("User", userSchema);