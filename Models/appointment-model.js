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
  age: {
    type: Number,
    required:true
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
      cause: {
        type: String
  },
    status: {
        type: String,
        enum: ['New','Pending', 'Approved', 'Rejected'],
        default: 'New',
  },
  userId: { // Add this field to track which user booked the appointment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true
  }
    
});
  
module.exports = mongoose.model('Appointment', appointmentSchema);