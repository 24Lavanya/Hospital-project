const mongoose = require('mongoose')


const patientSchema = mongoose.Schema({
    patientname: {
        type: String,
        required: true,
        // unique:true,
    },
    bloodGroup: {
        type: String,
        // required:true,
    },
    dob: {
        type:String,
    },
    phoneNo: {
        type:Number,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
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

module.exports = mongoose.model("Patient", patientSchema);