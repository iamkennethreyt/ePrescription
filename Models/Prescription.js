const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patients"
  },
  prescriptions: [
    {
      drug: {
        type: Schema.Types.ObjectId,
        ref: "drugs"
      },
      dispense: {
        type: String,
        required: true
      },
      frequency: {
        type: String
      }
    }
  ],
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Prescription = mongoose.model(
  "prescriptions",
  PrescriptionSchema
);
