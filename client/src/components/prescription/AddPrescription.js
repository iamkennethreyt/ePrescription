import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPrescription } from "../../actions/prescriptionActions";
import { getPatients } from "../../actions/patientActions";
import classnames from "classnames";

import TextFieldGroup from "../common/TextFieldGroup";

class AddPrescription extends Component {
  componentDidMount() {
    this.props.getPatients();
  }
  state = {
    patient: "",
    dateTo: "",
    dateFrom: "",
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
      patient: this.state.patient,
      notes: this.state.notes,
      dateTo: this.state.dateTo,
      dateFrom: this.state.dateFrom,

      doctor: this.props.auth.user._id
    };

    this.props.addPrescription(newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      patient: "",
      notes: "",
      dateTo: "",
      dateFrom: "",
      errors: {}
    });
    alert("Successfully added new prescription");
    window.location.reload();
  };

  render() {
    const selectOptions = this.props.patients.patients.map((option, i) => (
      <option key={i} value={option._id}>
        {option.firstname + " " + option.lastname}
      </option>
    ));

    const { errors } = this.state;
    return (
      <form className="border border-light p-5" onSubmit={this.onSubmit}>
        <div className="form-group">
          <select
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.patient
            })}
            name="patient"
            value={this.state.patient}
            onChange={this.onChange}
          >
            <option>Please Select patient</option>
            {selectOptions}
          </select>
          {errors.patient && (
            <div className="invalid-feedback">{errors.patient}</div>
          )}
        </div>
        <button className="btn pink btn-block mt-4" type="submit">
          Save
        </button>
      </form>
    );
  }
}

AddPrescription.propTypes = {
  addPrescription: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  users: state.patients,
  patients: state.patients,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPrescription, getPatients }
)(AddPrescription);
