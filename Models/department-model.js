const mongoose = require('mongoose')


const departmentSchema = mongoose.Schema({
    deptname: {
        type: String,
        required: true,
        // unique:true,
    },
    hod: {
        type: String,
        // required:true,
    },
    
    description: {
        type: String,
        // required: true,
        // unique: true,
    },
    


})

module.exports = mongoose.model("Department", departmentSchema);