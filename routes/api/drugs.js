const express = require("express");
const passport = require("passport");
const router = express.Router();

//load validation
const validateInput = require("../../validations/drugs/register");

const Drug = require("../../models/Drug");

//@desc     Register new Drug
//@access   public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newdata = new Drug({
      drug: req.body.drug,
      dosage: req.body.dosage,
      brand: req.body.brand,
      unit: req.body.unit,
      quantity: req.body.quantity,
      storage: req.body.storage,
      indicator: req.body.indicator,
      adversereaction: req.body.adversereaction,
      contraindications: req.body.contraindications
    });

    newdata.save().then(drug => res.json(drug));
  }
);

//@route    GET api/students/
//@desc     Show all drugs
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There are no drugs yet added";
    Drug.find()
      .then(drugs => {
        if (!drugs) {
          return res.status(404).json(errors);
        }
        res.json(drugs);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//change drug status
router.put(
  "/changestatus/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Drug.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    ).then(user => res.json(user));
  }
);

module.exports = router;
