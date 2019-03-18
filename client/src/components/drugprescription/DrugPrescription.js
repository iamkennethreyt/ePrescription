import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  getPrescription,
  removeDrugPrescription
} from "../../actions/prescriptionActions";

import Spinner from "../common/Spinner";
import AddDrugPrescription from "./AddDrugPrescription";
// import AddPrescription from "./AddPrescription";

class DrugPrescription extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    this.props.getPrescription(this.props.match.params.id);
  }
  render() {
    const { loading, prescription, prescriptions } = this.props.prescriptions;
    const { patient } = this.props.prescriptions.prescription;
    let displaypatient;
    let displayTable;
    if (
      prescription.patient === null ||
      loading ||
      prescription.patient === undefined
    ) {
      displaypatient = <Spinner />;
    } else {
      displaypatient = (
        <div>
          <h3>{`${patient.firstname} ${patient.lastname}`}</h3>
          <p className="font-weight-bold">
            Gender{" "}
            <span className="font-weight-normal">: {patient.gender}</span>
          </p>
          <p className="font-weight-bold">
            Blood Type{" "}
            <span className="font-weight-normal">: {patient.bloodtype}</span>
          </p>
          <p className="font-weight-bold">
            Date of Birth{" "}
            <span className="font-weight-normal">
              : {moment(patient.birthdate).format("MMMM DD, YYYY")}
            </span>
          </p>
          <p className="font-weight-bold">
            Phone Number{" "}
            <span className="font-weight-normal">: {patient.phonenumber}</span>
          </p>
          <p className="font-weight-bold">
            Complete Address{" "}
            <span className="font-weight-normal">: {patient.address}</span>
          </p>
        </div>
      );
      displayTable = (
        <table className="table table-responsive text-nowrap">
          <thead className="pink white-text">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Generic Names</th>
              <th scope="col">Brand Names</th>
              <th scope="col">Quantities</th>
              <th scope="col">Frequencies</th>
              <th scope="col">Notes</th>
              <th scope="col">Scheudule</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {prescription.prescriptions.map((pres, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{pres.drug.drug}</td>
                  <td>{pres.drug.brand}</td>
                  <td>{`${pres.dispense} (${pres.drug.quantity} ${
                    pres.drug.unit
                  })`}</td>
                  <td>{pres.frequency}</td>
                  <td>{pres.notes}</td>
                  <td>{pres.schedule}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger waves-effect btn-sm"
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to delete?")
                        ) {
                          this.props.removeDrugPrescription(
                            this.props.prescriptions.prescription._id,
                            { drug: pres.drug._id }
                          );
                          window.location.reload();
                        }
                      }}
                    >
                      Delete
                    </button>
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
          {displaypatient}
          {this.state.displayForm ? (
            <AddDrugPrescription
              id={this.props.prescriptions.prescription._id}
            />
          ) : null}
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
          {displayTable}
        </div>
      </div>
    );
  }
}

DrugPrescription.propTypes = {
  getPrescription: PropTypes.func.isRequired,
  removeDrugPrescription: PropTypes.func.isRequired,
  prescriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPrescription, removeDrugPrescription }
)(withRouter(DrugPrescription));
