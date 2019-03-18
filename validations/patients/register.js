const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.gender = !_.isEmpty(data.gender) ? data.gender : "";
  data.userid = !_.isEmpty(data.userid) ? data.userid : "";
  data.firstname = !_.isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !_.isEmpty(data.lastname) ? data.lastname : "";
  data.address = !_.isEmpty(data.address) ? data.address : "";
  data.bloodtype = !_.isEmpty(data.bloodtype) ? data.bloodtype : "";
  data.birthdate = !_.isEmpty(data.birthdate) ? data.birthdate : "";
  data.phonenumber = !_.isEmpty(data.phonenumber) ? data.phonenumber : "";

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.userid)) {
    errors.userid = "userid field is required";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (Validator.isEmpty(data.bloodtype)) {
    errors.bloodtype = "bloodtype field is required";
  }

  if (Validator.isEmpty(data.birthdate)) {
    errors.birthdate = "birthdate field is required";
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "phonenumber field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
