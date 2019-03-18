import React, { Component } from "react";
import Modules from "../layout/Modules";
import Home from "./Home";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { getPatients } from "../../actions/patientActions";
import { getDrugs } from "../../actions/drugActions";
import { getPrescriptions } from "../../actions/prescriptionActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDrugs();
    this.props.getPatients();
    this.props.getPrescriptions();
    this.props.getUsers();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <Modules />
        </div>
        <div className="col-md-8">
          <Home
            drugs={this.props.drugs.length}
            users={this.props.users.length}
            patients={this.props.patients.length}
            prescriptions={this.props.prescriptions.length}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getDrugs: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  getPrescriptions: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  drugs: PropTypes.object.isRequired,
  patients: PropTypes.object.isRequired,
  prescriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users,
  drugs: state.drugs.drugs,
  patients: state.patients.patients,
  prescriptions: state.prescriptions.prescriptions
});

export default connect(
  mapStateToProps,
  { getDrugs, getPatients, getPrescriptions, getUsers }
)(Dashboard);
