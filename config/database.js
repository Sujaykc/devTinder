const mongoose = require('mongoose');

const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://contactmanageruser:AzqCQf74CigJhbNA@contact-manager-cluster.du3ck12.mongodb.net/devTinder");
}

module.exports = connectDB;