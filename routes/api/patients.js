const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/key").secretOrkey;
const passport = require("passport");

const router = express.Router();

//load validation
const validateInput = require("../../validations/patients/register");
const ValidateLoginInput = require("../../validations/users/login");

const Patient = require("../../models/Patient");

//@desc     Register new patient
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

    Patient.findOne({ userid: req.body.userid }).then(user => {
      errors.userid = "User ID is already exists";
      if (user) {
        return res.status(400).json(errors);
      } else {
        const newdata = new Patient({
          userid: req.body.userid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          address: req.body.address,
          bloodtype: req.body.bloodtype,
          birthdate: req.body.birthdate,
          phonenumber: req.body.phonenumber,
          password: req.body.userid
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newdata.password, salt, (err, hash) => {
            if (err) throw err;
            newdata.password = hash;
            newdata
              .save()
              .then(data => res.json(data))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

//@desc     login user and returns JWT web token
router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    const { errors, isValid } = ValidateLoginInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Find User by Email
    Patient.findOne({ userid }).then(user => {
      //check user
      if (!user) {
        errors.userid = "Patient user ID not found";
        return res.status(404).json(errors);
      }

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        //user  matched
        if (isMatch) {
          // create JWT payload
          const payload = {
            _id: user._id,
            id: user.userid,
            firstname: user.firstname,
            lastname: user.lastname,
            usertype: user.usertype
          };

          //sign token
          jwt.sign(payload, key, (err, token) => {
            res.json({
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password is incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

const ValidateChangePasswordInput = require("../../validations/ChangePassword");
router.put(
  "/changepassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateChangePasswordInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //check password
    bcrypt.compare(req.body.password, req.user.password).then(isMatch => {
      if (isMatch) {
        Patient.findById(req.user.id, (err, user) => {
          if (err) throw err;

          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(req.body.password3, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  }
);

//@route    GET api/patients/
//@desc     Show all patients
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There are no patients yet added";
    Patient.find()
      .then(patients => {
        if (!patients) {
          return res.status(404).json(errors);
        }

        res.json(patients);
      })
      .catch(err => res.status(404).json(errors));
  }
);

module.exports = router;
