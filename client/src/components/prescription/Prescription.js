import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addPrescription,
  getPrescriptions
} from "../../actions/prescriptionActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import AddPrescription from "./AddPrescription";
import moment from "moment";

class Prescription extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    this.props.getPrescriptions();
  }
  render() {
    const { loading, prescriptions } = this.props.prescriptions;
    console.log("prescriptions", prescriptions);
    let listofprescriptions;
    if (prescriptions === null || loading || prescriptions === undefined) {
      listofprescriptions = <Spinner />;
    } else {
      listofprescriptions = (
        <table className="table">
          <thead className="pink white-text">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient's Name</th>
              <th scope="col">Date</th>

              {this.props.auth.user.usertype !== "Doctor" ? (
                <th scope="col">Doctor's Name</th>
              ) : null}
              {/* <th scope="col">Doctor's Name</th> */}
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions
              .filter(pres => {
                if (this.props.auth.user.usertype === "Doctor") {
                  return pres.doctor._id === this.props.auth.user._id;
                } else {
                  return true;
                }
              })
              .filter(pres => {
                if (this.props.auth.user.usertype === "Patient") {
                  return pres.patient._id === this.props.auth.user._id;
                } else {
                  return true;
                }
              })
              .map((pres, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {pres.patient.firstname + " " + pres.patient.lastname}
                    </td>
                    <td>{moment(pres.date).format("MMMM DD, YYYY")}</td>
                    {this.props.auth.user.usertype !== "Doctor" ? (
                      <td>{`Dr. ${pres.doctor.firstname} ${
                        pres.doctor.lastname
                      }`}</td>
                    ) : null}

                    <td>
                      <Link
                        to={`/prescription/${pres._id}`}
                        className="btn btn-outline-danger waves-effect btn-sm"
                      >
                        Action
                      </Link>
                    </td>
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
          {this.state.displayForm ? <AddPrescription /> : null}

          <div className="d-flex justify-content-between">
            <h1>Prescription Management</h1>
            {this.props.auth.user.usertype !== "Pharmacist" &&
            this.props.auth.user.usertype !== "Patient" ? (
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

          {listofprescriptions}
        </div>
      </div>
    );
  }
}

Prescription.propTypes = {
  getPrescriptions: PropTypes.func.isRequired,
  prescriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPrescription, getPrescriptions }
)(Prescription);
