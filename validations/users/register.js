const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.userid = !_.isEmpty(data.userid) ? data.userid : "";
  data.firstname = !_.isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !_.isEmpty(data.lastname) ? data.lastname : "";
  data.usertype = !_.isEmpty(data.usertype) ? data.usertype : "";

  if (Validator.isEmpty(data.userid)) {
    errors.userid = "User ID field is required";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  if (Validator.isEmpty(data.usertype)) {
    errors.usertype = "User type field name field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
