import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDrug } from "../../actions/drugActions";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class AddDrug extends Component {
  state = {
    drug: "",
    dosage: "",
    unit: "",
    quantity: "",
    storage: "",
    indicator: "",
    adversereaction: "",
    contraindications: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newData = {
      drug: this.state.drug,
      dosage: this.state.dosage,
      unit: this.state.unit,
      storage: this.state.storage,
      indicator: this.state.indicator,
      quantity: this.state.quantity,
      adversereaction: this.state.adversereaction,
      brand: this.state.brand,
      contraindications: this.state.contraindications
    };

    this.props.addDrug(newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      drug: "",
      brand: "",
      dosage: "",
      unit: "",
      storage: "",
      indicator: "",
      adversereaction: "",
      contraindications: "",
      errors: {}
    });
    alert("Successfully added new drug");
  };

  render() {
    const { errors } = this.state;
    const dosages = [
      { label: "* Select Dosage", value: 0 },
      { label: "Syrup", value: "Syrup" },
      { label: "Suppository", value: "Suppository" },
      { label: "Suspension", value: "Suspension" },
      { label: "IV", value: "IV" },
      { label: "Capsule", value: "Capsule" },
      { label: "Tablet", value: "Tablet" }
    ];

    const units = [
      { label: "* Select Unit", value: 0, isSolid: true },
      { label: "mg", value: "Miligram", isSolid: true },
      { label: "g", value: "Gram", isSolid: true },
      { label: "* Select Unit", value: 0, isSolid: false },
      { label: "ml", value: "Mililiter", isSolid: false },
      { label: "l", value: "Liter", isSolid: false }
    ];

    return (
      <form className="border border-light p-5" onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="Generic Name"
          name="drug"
          value={this.state.drug}
          onChange={this.onChange}
          error={errors.drug}
        />

        <TextFieldGroup
          placeholder="Brand Name"
          name="brand"
          value={this.state.brand}
          onChange={this.onChange}
          error={errors.brand}
        />

        <SelectListGroup
          placeholder="Dosage"
          name="dosage"
          value={this.state.dosage}
          onChange={this.onChange}
          options={dosages}
          error={errors.dosage}
          info="Input the dosage information (eg. tablet, casule etc.)"
        />

        <TextFieldGroup
          placeholder="Quantity"
          type="number"
          name="quantity"
          value={this.state.quantity}
          onChange={this.onChange}
          error={errors.quantity}
        />

        <SelectListGroup
          placeholder="Unit"
          name="unit"
          value={this.state.unit}
          onChange={this.onChange}
          options={
            this.state.dosage === "Capsule" || this.state.dosage === "Tablet"
              ? units.filter(dosage => dosage.isSolid)
              : units.filter(dosage => !dosage.isSolid)
          }
          error={errors.unit}
          info="Input the unit information (eg. mililiter, miligram etc.)"
        />

        <TextFieldGroup
          placeholder="Storage"
          name="storage"
          type="number"
          value={this.state.storage}
          onChange={this.onChange}
          error={errors.storage}
          info="Input the room storage temperature, (eg. 19ºC)"
        />

        <TextFieldGroup
          placeholder="Indications"
          name="indicator"
          value={this.state.indicator}
          onChange={this.onChange}
          error={errors.indicator}
          info="Input some details of the drug"
        />

        <TextFieldGroup
          placeholder="Adverse Reaction"
          name="adversereaction"
          value={this.state.adversereaction}
          onChange={this.onChange}
          error={errors.adversereaction}
          info="Input adverse reaction (eg. Liver damage, Muscle tissue destruction)"
        />
        <TextFieldGroup
          placeholder="Contraindications"
          name="contraindications"
          value={this.state.contraindications}
          onChange={this.onChange}
          error={errors.contraindications}
          info="Input contraindications (eg. People who are allergic to aspirin.)"
        />

        <button className="btn pink btn-block mt-4" type="submit">
          Save
        </button>
      </form>
    );
  }
}

AddDrug.propTypes = {
  addDrug: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addDrug }
)(AddDrug);
