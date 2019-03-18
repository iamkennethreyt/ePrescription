import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDrugPrescription } from "../../actions/prescriptionActions";
import { getDrugs } from "../../actions/drugActions";
import classnames from "classnames";
import _ from "lodash";

import TextFieldGroup from "../common/TextFieldGroup";

class AddPrescription extends Component {
  componentDidMount() {
    this.props.getDrugs();
  }
  state = {
    drug: "",
    generic: "",
    dispense: "",
    schedule: "",
    notes: "",
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
      dispense: this.state.dispense,
      notes: this.state.notes,
      schedule: this.state.schedule,
      frequency: this.state.frequency
    };

    this.props.addDrugPrescription(this.props.id, newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      patient: "",
      dispense: "",
      notes: "",
      frequency: "",
      schedule: "",
      errors: {}
    });
    alert("Successfully added new drug");
    window.location.reload();
  };

  render() {
    const result = _.chain(this.props.drugs.drugs.filter(d => d.status))
      .groupBy("drug")
      .map(function(v, i) {
        return {
          drug: i,
          value: _.get(_.find(v, "drug"), "drug"),
          label: _.get(_.find(v, "drug"), "drug")
        };
      })
      .value();

    const selectGenericDrug = result.map((option, i) => (
      <option key={i} value={option.value}>
        {option.label}
      </option>
    ));

    const selectOptions = this.props.drugs.drugs
      .filter(d => d.drug === this.state.generic)
      .map((option, i) => (
        <option key={i} value={option._id}>
          {`${option.brand} (${option.quantity} ${option.unit})`}
        </option>
      ));

    const { errors } = this.state;
    return (
      <form className="border border-light p-5" onSubmit={this.onSubmit}>
        <div className="form-group">
          <select
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.generic
            })}
            name="generic"
            value={this.state.generic}
            onChange={this.onChange}
          >
            <option>Please Select generic name</option>
            {selectGenericDrug}
          </select>
          {errors.generic && (
            <div className="invalid-feedback">{errors.generic}</div>
          )}
        </div>

        <div className="form-group">
          <select
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.drug
            })}
            name="drug"
            value={this.state.drug}
            onChange={this.onChange}
          >
            <option>Please Select drug</option>
            {selectOptions}
          </select>
          {errors.drug && <div className="invalid-feedback">{errors.drug}</div>}
        </div>

        <TextFieldGroup
          placeholder="Quantity"
          name="dispense"
          type="number"
          value={this.state.dispense}
          onChange={this.onChange}
          error={errors.dispense}
          info="Input some notes of the patient"
        />
        <TextFieldGroup
          placeholder="Frequency"
          name="frequency"
          value={this.state.frequency}
          onChange={this.onChange}
          error={errors.frequency}
          info="Input some frequency of the drug to the patient"
        />
        <TextFieldGroup
          placeholder="Note"
          name="notes"
          value={this.state.notes}
          onChange={this.onChange}
          error={errors.notes}
          info="Input some notes of the drug to the patient"
        />

        <TextFieldGroup
          placeholder="Schedule"
          name="schedule"
          value={this.state.schedule}
          onChange={this.onChange}
          error={errors.schedule}
          info="Input the schedule of the drug taken by the patient"
        />

        <button className="btn pink btn-block mt-4" type="submit">
          Save
        </button>
      </form>
    );
  }
}

AddPrescription.propTypes = {
  addDrugPrescription: PropTypes.func.isRequired,
  getDrugs: PropTypes.func.isRequired,
  drugs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  drugs: state.drugs
});

export default connect(
  mapStateToProps,
  { addDrugPrescription, getDrugs }
)(AddPrescription);
