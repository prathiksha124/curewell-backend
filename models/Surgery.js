const mongoose = require("mongoose");

const surgerySchema = new mongoose.Schema({
  surgeryId: Number,
  doctorId: Number,
  surgeryDate: String,
  startTime: Number,
  endTime: Number,
  surgeryCategory: String
});

module.exports = mongoose.model("Surgery", surgerySchema);