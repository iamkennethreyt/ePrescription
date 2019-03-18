import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPatient } from "../../actions/patientActions";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class AddPatient extends Component {
  state = {
    usertype: "",
    firstname: "",
    lastname: "",
    gender: "",
    bloodtype: "",
    birthdate: "",
    address: "",
    phonenumber: "",
    userid: "",
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
      firstname: this.state.firstname,
      userid: this.state.userid,
      lastname: this.state.lastname,
      gender: this.state.gender,
      bloodtype: this.state.bloodtype,
      birthdate: this.state.birthdate,
      address: this.state.address,
      phonenumber: this.state.phonenumber
    };

    this.props.addPatient(newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      usertype: "",
      userid: "",
      firstname: "",
      lastname: "",
      gender: "",
      bloodtype: "",
      birthdate: "",
      address: "",
      phonenumber: "",
      errors: {}
    });
    alert("Successfully added new patient");
  };

  render() {
    const { errors } = this.state;
    const gender = [
      { label: "* Select Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];

    const bloodtypes = [
      { label: "* Select the Blood Type", value: 0 },
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "AB-", value: "AB-" },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" }
    ];
    return (
      <form className="border border-light p-5" onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="First Name"
          name="firstname"
          value={this.state.firstname}
          onChange={this.onChange}
          error={errors.firstname}
        />
        <TextFieldGroup
          placeholder="Last Name"
          name="lastname"
          value={this.state.lastname}
          onChange={this.onChange}
          error={errors.lastname}
        />

        <TextFieldGroup
          placeholder="User ID"
          name="userid"
          value={this.state.userid}
          onChange={this.onChange}
          error={errors.userid}
        />

        <SelectListGroup
          placeholder="Gender"
          name="gender"
          value={this.state.gender}
          onChange={this.onChange}
          options={gender}
          error={errors.gender}
        />

        <TextFieldGroup
          placeholder="Birth Date"
          type="date"
          name="birthdate"
          value={this.state.birthdate}
          onChange={this.onChange}
          error={errors.birthdate}
        />

        <SelectListGroup
          placeholder="Blood Type"
          name="bloodtype"
          value={this.state.bloodtype}
          onChange={this.onChange}
          options={bloodtypes}
          error={errors.bloodtype}
        />

        <TextFieldGroup
          placeholder="Contact Number"
          name="phonenumber"
          value={this.state.phonenumber}
          onChange={this.onChange}
          error={errors.phonenumber}
        />

        <TextFieldGroup
          placeholder="Complete Address"
          name="address"
          value={this.state.address}
          onChange={this.onChange}
          error={errors.address}
        />

        <button className="btn pink btn-block mt-4" type="submit">
          Save
        </button>
      </form>
    );
  }
}

AddPatient.propTypes = {
  addPatient: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPatient }
)(AddPatient);
