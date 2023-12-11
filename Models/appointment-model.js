const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
      },
      doctorname: {
        type: String,
        required: true
      },
      phone: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      message: {
        type: String
      },
    // striked: { type: Boolean, default: false },
});
  
module.exports = mongoose.model('Appointment', appointmentSchema);