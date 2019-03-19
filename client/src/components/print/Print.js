import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { getPrescription } from "../../actions/prescriptionActions";

import Spinner from "../common/Spinner";

class Print extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    this.props.getPrescription(this.props.match.params.id);
    window.setTimeout(function() {
      window.print();
    }, 1000);
  }
  render() {
    // console.log(this.props.prescriptions.prescription.date);
    const { loading, prescription, prescriptions } = this.props.prescriptions;
    const { patient, doctor } = this.props.prescriptions.prescription;
    let displaypatient;
    let displayTable;
    let displayDoctor;
    if (
      prescription.patient === null ||
      loading ||
      prescription.patient === undefined
    ) {
      displaypatient = <Spinner />;
    } else {
      displayDoctor = (
        <div className="d-flex w-100 justify-content-between">
          <div />
          <div>
            <p className="font-weight-bold mb-0">{`${doctor.firstname} ${
              doctor.lastname
            }`}</p>
            <p className="font-weight-normal mt-0">Doctor Name</p>
          </div>
        </div>
      );
      displaypatient = (
        <div>
          <div className="d-flex w-100 justify-content-between">
            <div>
              <h3>{`${patient.firstname} ${patient.lastname}`}</h3>
              <p className="font-weight-bold">
                Gender{" "}
                <span className="font-weight-normal">: {patient.gender}</span>
              </p>
            </div>
            <div className="text-right">
              <p>{moment(prescription.date).format("MMM DD,YYYY")}</p>
              <strong>Date</strong>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between">
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
          </div>
          <div className="d-flex w-100 justify-content-between">
            <p className="font-weight-bold">
              Phone Number{" "}
              <span className="font-weight-normal">
                : {patient.phonenumber}
              </span>
            </p>
            <p className="font-weight-bold">
              Complete Address{" "}
              <span className="font-weight-normal">: {patient.address}</span>
            </p>
          </div>
        </div>
      );
      displayTable = (
        <table class="table table-sm table-bordered ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Drugs</th>
              <th scope="col">Frequency</th>
              <th scope="col">Notes</th>
              <th scope="col">Schedules</th>
            </tr>
          </thead>
          <tbody>
            {prescription.prescriptions.map((dp, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th className="list-group-item">
                    {`${dp.dispense} ${dp.drug.quantity}${dp.drug.unit} ${
                      dp.drug.drug
                    } ${dp.drug.brand}`}
                  </th>
                  <th>{dp.frequency}</th>
                  <th>{dp.notes}</th>
                  <th>{dp.schedule}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    return (
      <div className="row">
        <div className="col-md-7 m-auto">
          {displaypatient}
          {displayTable}
          <div style={{ height: 70 }} />
          {displayDoctor}
        </div>
      </div>
    );
  }
}

Print.propTypes = {
  getPrescription: PropTypes.func.isRequired,
  prescriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPrescription }
)(withRouter(Print));
