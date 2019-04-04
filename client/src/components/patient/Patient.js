import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPatient, getPatients } from "../../actions/patientActions";
import moment from "moment";

import Spinner from "../common/Spinner";
import AddPatient from "./AddPatient";

class Patient extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    this.props.getPatients();
  }
  render() {
    console.log(this.props.auth.user.usertype);
    const { loading, patients } = this.props.patients;
    let listofpatients;
    if (patients === null || loading || patients === undefined) {
      listofpatients = <Spinner />;
    } else {
      listofpatients = (
        <table className="table ">
          <thead className="pink white-text">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient ID</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Birthdate</th>
              <th scope="col">Blood Type</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{patient.userid}</td>
                  <td>{patient.firstname + " " + patient.lastname}</td>
                  <td>{patient.gender}</td>
                  <td>{moment(patient.birthdate).format("MMMM DD, YYYY")}</td>
                  <td>{patient.bloodtype}</td>
                  <td>{patient.phonenumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    return (
      <div className="row">
        <div className="col-md-4">
          <Modules />
        </div>
        <div className="col-md-8">
          {this.state.displayForm ? <AddPatient /> : null}

          <div className="d-flex justify-content-between">
            <h1>Patient Management</h1>
            {this.props.auth.user.usertype !== "Doctor" ? (
              <button
                className="btn btn-outline-danger waves-effect"
                onClick={() => {
                  this.setState(prevState => ({
                    displayForm: !prevState.displayForm
                  }));
                }}
              >
                {this.state.displayForm ? "Close" : "Add"}
              </button>
            ) : null}
          </div>

          {listofpatients}
        </div>
      </div>
    );
  }
}

Patient.propTypes = {
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  patients: state.patients,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPatient, getPatients }
)(Patient);
