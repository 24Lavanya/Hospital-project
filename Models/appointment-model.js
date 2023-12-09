const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    patientName: String,
    striked: { type: Boolean, default: false },
});
  
module.exports = mongoose.model('Appointment', appointmentSchema);