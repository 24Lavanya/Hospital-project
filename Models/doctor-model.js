const mongoose = require('mongoose')


const doctorSchema = mongoose.Schema({
    doctorname: {
        type: String,
        required: true,
        // unique:true,
    },
    phoneNo: {
        type:Number,
    },
    department: {
        type: String,
        // required:true,
    },
    dob: {
        type:String,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
    },
    istop:{
        type: Boolean,
        default:false,
    },
    exp: {
        type: Number,
        // required: true, 
    },
    gender: {
        type: String,
        // required: true, 
    },
    address: {
        type: String,
        // required: true,
      },


})

module.exports = mongoose.model("Doctor", doctorSchema);