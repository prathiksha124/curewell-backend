const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  specializationCode: String,
  specializationName: String
});

module.exports = mongoose.model("Specialization", specializationSchema);