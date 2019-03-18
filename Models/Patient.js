const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bloodtype: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    default: "Patient"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model("patients", PatientSchema);
