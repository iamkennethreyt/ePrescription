const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.patient = !_.isEmpty(data.patient) ? data.patient : "";
  data.doctor = !_.isEmpty(data.doctor) ? data.doctor : "";

  if (Validator.isEmpty(data.patient)) {
    errors.patient = "patient field is required";
  }

  if (Validator.isEmpty(data.doctor)) {
    errors.doctor = "doctor field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
