const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm=require("passport-local-mongoose");




// Create a schema for the user
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true,    
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  // fullname: {
  //   type: String,
  //   required: true,
  // },
});


userSchema.plugin(plm);
module.exports = mongoose.model('Users', userSchema);