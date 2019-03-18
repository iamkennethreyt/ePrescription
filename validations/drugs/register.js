const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.drug = !_.isEmpty(data.drug) ? data.drug : "";
  data.brand = !_.isEmpty(data.brand) ? data.brand : "";
  data.dosage = !_.isEmpty(data.dosage) ? data.dosage : "";
  data.unit = !_.isEmpty(data.unit) ? data.unit : "";
  data.quantity = !_.isEmpty(data.quantity) ? data.quantity : "";
  data.storage = !_.isEmpty(data.storage) ? data.storage : "";
  data.indicator = !_.isEmpty(data.indicator) ? data.indicator : "";
  data.contraindications = !_.isEmpty(data.contraindications)
    ? data.contraindications
    : "";
  data.adversereaction = !_.isEmpty(data.adversereaction)
    ? data.adversereaction
    : "";

  if (Validator.isEmpty(data.drug)) {
    errors.drug = "drug field is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "quantity field is required";
  }

  if (Validator.isEmpty(data.dosage)) {
    errors.dosage = "dosage field is required";
  }

  if (Validator.isEmpty(data.brand)) {
    errors.brand = "brand field is required";
  }

  if (Validator.isEmpty(data.unit)) {
    errors.unit = "unit field is required";
  }

  if (Validator.isEmpty(data.storage)) {
    errors.storage = "storage field is required";
  }

  if (Validator.isEmpty(data.indicator)) {
    errors.indicator = "indicator field is required";
  }

  if (Validator.isEmpty(data.contraindications)) {
    errors.contraindications = "contraindications field is required";
  }

  if (Validator.isEmpty(data.adversereaction)) {
    errors.adversereaction = "adversereaction field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
