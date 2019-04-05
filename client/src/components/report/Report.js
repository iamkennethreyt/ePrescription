import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addPrescription,
  getPrescriptions
} from "../../actions/prescriptionActions";
import { getUsers } from "../../actions/userActions";
import { getPatients } from "../../actions/patientActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import moment from "moment";

class Report extends Component {
  state = {
    displayForm: false,
    dateFrom: moment()
      .subtract(10, "days")
      .format(),
    dateTo: moment()
      .add(10, "days")
      .format(),
    doctor: "",
    patient: ""
  };
  componentDidMount() {
    this.props.getPrescriptions();
    this.props.getPatients();
    this.props.getUsers();

    if (this.props.auth.user.usertype === "Patient") {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const doctors = this.props.users.users
      .filter(x => x.usertype === "Doctor")
      .map((option, i) => (
        <option key={i} value={option._id}>
          {`${option.firstname} ${option.lastname}`}
        </option>
      ));

    const patients = this.props.patients.patients.map((option, i) => (
      <option key={i} value={option._id}>
        {`${option.firstname} ${option.lastname}`}
      </option>
    ));
    const { loading, prescriptions } = this.props.prescriptions;
    let listofprescriptions;
    if (prescriptions === null || loading || prescriptions === undefined) {
      listofprescriptions = <Spinner />;
    } else {
      listofprescriptions = (
        <ul className="list-group">
          {prescriptions
            .filter(pres => {
              if (this.state.doctor === "" || this.state.doctor === 0) {
                return true;
              } else {
                return pres.doctor._id === this.state.doctor;
              }
            })
            .filter(pres => {
              if (this.state.patient === "" || this.state.patient === 0) {
                return true;
              } else {
                return pres.patient._id === this.state.patient;
              }
            })
            .filter(pres => {
              return (
                pres.date >= this.state.dateFrom &&
                pres.date <= this.state.dateTo
              );
            })
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
                <li
                  key={i}
                  className="list-group-item list-group-item-action flex-column align-items-start mt-2"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-2 h5">
                      {pres.patient.firstname + " " + pres.patient.lastname}
                    </h5>
                    <small className="text-muted">
                      {moment(pres.date).format("MMMM DD, YYYY")}
                    </small>
                  </div>
                  <table className="table table-sm table-bordered py-0">
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
                      {pres.prescriptions.map((dp, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <th className="list-group-item">
                              {`${dp.dispense} ${dp.drug.quantity}${
                                dp.drug.unit
                              } ${dp.drug.drug} ${dp.drug.brand}`}
                            </th>
                            <th>{dp.frequency}</th>
                            <th>{dp.notes}</th>
                            <th>{dp.schedule}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      {this.props.auth.user.usertype !== "Doctor"
                        ? `Dr. ${pres.doctor.firstname} ${pres.doctor.lastname}`
                        : null}
                    </small>
                    <Link
                      to={`/print/${pres._id}`}
                      className="btn btn-outline-danger btn-sm waves-effect"
                    >
                      Print
                    </Link>
                  </div>
                </li>
              );
            })}
        </ul>
      );
    }
    return (
      <div className="row">
        <div className="col-md-4">
          <Modules />
        </div>
        <div className="col-md-8">
          <h1>Prescription Reports</h1>

          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="dateFrom">
                  Date From (
                  <strong>
                    {moment(this.state.dateFrom).format("MMM DD, YYYY")}
                  </strong>
                  )
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  defaultValue={this.state.dateFrom}
                  id="dateFrom"
                  onChange={e =>
                    this.setState({ dateFrom: moment(e.target.value).format() })
                  }
                  className="form-control"
                  placeholder="Date From"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="dateTo">
                  Date To (
                  <strong>
                    {moment(this.state.dateTo).format("MMM DD, YYYY")}
                  </strong>
                  )
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={e =>
                    this.setState({ dateTo: moment(e.target.value).format() })
                  }
                  name="dateTo"
                  id="dateTo"
                  placeholder="Date To"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="doctors">Doctors</label>
                <select
                  id="doctors"
                  className="form-control form-control-lg"
                  name="doctor"
                  value={this.state.doctor}
                  onChange={this.onChange}
                >
                  <option value="">Please Select Doctor</option>
                  {doctors}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="patients">Patients</label>
                <select
                  id="patients"
                  className="form-control form-control-lg"
                  name="patient"
                  value={this.state.patient}
                  onChange={this.onChange}
                >
                  <option value="">Please Select Patient</option>
                  {patients}
                </select>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-between" />

          {listofprescriptions}
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getPrescriptions: PropTypes.func.isRequired,
  prescriptions: PropTypes.object.isRequired,
  patients: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
  users: state.users,
  patients: state.patients,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPrescription, getPrescriptions, getUsers, getPatients }
)(Report);
