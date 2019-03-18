const validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userid = !_.isEmpty(data.userid) ? data.userid : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.userid)) {
    errors.userid = "User ID field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
