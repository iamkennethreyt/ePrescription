const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrugSchema = new Schema({
  drug: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  indicator: {
    type: String,
    required: true
  },
  contraindications: {
    type: String,
    required: true
  },
  adversereaction: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Drug = mongoose.model("drugs", DrugSchema);
