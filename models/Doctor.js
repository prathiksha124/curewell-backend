const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: Number,
    required: true,
    unique: true
  },
  doctorName: String,
  specializationCode: String 
});

module.exports = mongoose.model("Doctor", doctorSchema);
