const express = require("express");
const passport = require("passport");

const router = express.Router();

//load validation
const validateInput = require("../../validations/prescriptions/register");

const Prescription = require("../../models/Prescription");
const User = require("../../models/User");
const Patient = require("../../models/Patient");
const Drug = require("../../models/Drug");

//@desc     Register new Prescription
//@access   public
router.post("/", (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.body.doctor)
    .then(() => {
      Patient.findById(req.body.patient)
        .then(() => {
          const newdata = new Prescription({
            doctor: req.body.doctor,
            patient: req.body.patient
          });
          newdata.save().then(prescriptions => res.json(prescriptions));
        })
        .catch(err => {
          res.status(404).json({ patient: "patient id not found" });
        });
    })
    .catch(err => res.status(404).json({ doctor: "doctor id not found" }));
});

//@route    GET api/prescriptions/
//@desc     Show all prescriptions
//@access   private
router.get("/", (req, res) => {
  const errors = {};
  errors.noprofile = "There are no prescriptions yet added";
  Prescription.find()
    .populate("patient")
    .populate("doctor")
    .then(prescriptions => {
      if (!prescriptions) {
        return res.status(404).json(errors);
      }
      res.json(prescriptions);
    })

    .catch(err => res.status(404).json(errors));
});

//@route    GET api/prescriptions/
//@desc     Show all prescriptions
//@access   private
router.get("/:id", (req, res) => {
  const errors = {};
  errors.noprofile = "There are no prescriptions yet added";
  Prescription.findById(req.params.id)
    .populate("patient")
    .populate("doctor")
    .populate("prescriptions.drug")
    .then(prescriptions => {
      if (!prescriptions) {
        return res.status(404).json(errors);
      }
      res.json(prescriptions);
    })

    .catch(err => res.status(404).json(errors));
});

//@route    POST /api/classsections/register/:id
//@desc     Register new student in classsection
//@access   public
router.post("/:id", (req, res) => {
  const errors = {};
  if (!req.body.drug) {
    errors.drug = "Drug ID is required";
    return res.status(400).json(errors);
  }

  if (!req.body.dispense) {
    errors.dispense = "dispense is required";
    return res.status(400).json(errors);
  }

  Prescription.findById(req.params.id)
    .then(prescription => {
      Drug.findById(req.body.drug)
        .then(() => {
          if (
            prescription.prescriptions.filter(
              pres => pres.drug.toString() === req.body.drug
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ drug: "this drug is already added to prescription" });
          }

          // Add user id to prescriptions array
          prescription.prescriptions.unshift({
            dispense: req.body.dispense,
            drug: req.body.drug,
            notes: req.body.notes,
            schedule: req.body.schedule,
            frequency: req.body.frequency
          });

          prescription.save().then(prescription => res.json(prescription));
        })
        .catch(err => {
          res.status(404).json({ drug: "drug id not found" });
        });
    })
    .catch(err =>
      res.status(404).json({ prescription: "prescription id not found" })
    );
});

//@route    POST /api/classsections/register/:id
//@desc     Register new student in classsection
//@access   public
router.put("/:id", (req, res) => {
  const errors = {};
  if (!req.body.drug) {
    errors.drug = "Drug ID is required";
    return res.status(400).json(errors);
  }

  Prescription.findById(req.params.id)
    .then(prescription => {
      Drug.findById(req.body.drug)
        .then(() => {
          const removeIndex = prescription.prescriptions
            .map(item => item.drug.toString())
            .indexOf(req.body.drug);

          // Splice out of array
          prescription.prescriptions.splice(removeIndex, 1);

          // Save
          prescription.save().then(prescription => res.json(prescription));
        })
        .catch(err => {
          res.status(404).json({ drug: "drug id not found" });
        });
    })
    .catch(err =>
      res.status(404).json({ prescription: "prescription id not found" })
    );
});

module.exports = router;
