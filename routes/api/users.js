const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/key").secretOrkey;
const passport = require("passport");

const router = express.Router();

const ValidateRegisterInput = require("../../validations/users/register");
const ValidateLoginInput = require("../../validations/users/login");

//load User model
const User = require("../../models/User");

//@desc     login user and returns JWT web token
router.post("/login", (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;

  const { errors, isValid } = ValidateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by Email
  User.findOne({ userid }).then(user => {
    //check user
    if (!user) {
      errors.userid = "User ID not found";
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
});

//@route    PUT api/teachers/changepassword/:id
//@desc     account settings change password
//@access   private
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
        User.findById(req.user.id, (err, user) => {
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

//@desc     Register new user
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateRegisterInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ userid: req.body.userid }).then(user => {
      errors.userid = "User ID is already exists";
      if (user) {
        return res.status(400).json(errors);
      } else {
        const newdata = new User({
          userid: req.body.userid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          usertype: req.body.usertype,
          license: req.body.license,
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

//@route    GET api/users/
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There are no patients yet added";
    User.find()
      .then(users => {
        if (!users) {
          return res.status(404).json(errors);
        }

        res.json(users);
      })
      .catch(err => res.status(404).json(errors));
  }
);

module.exports = router;
