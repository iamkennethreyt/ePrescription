import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";

class Modules extends Component {
  render() {
    const { usertype } = this.props.auth.user;
    console.log("aww", this.props.match.path);
    return (
      <ul className="list-group">
        <Link
          to="/"
          className={`${
            this.props.location.pathname === "/"
              ? "pink text-white"
              : "pink-text"
          } list-group-item `}
        >
          HOME
        </Link>

        {usertype === "Admin" ? (
          <Link
            to="/users"
            className={`${
              this.props.location.pathname === "/users"
                ? "pink text-white"
                : "pink-text"
            } list-group-item`}
          >
            USERS
          </Link>
        ) : null}

        {usertype === "Admin" ||
        usertype === "Secretary" ||
        usertype === "Doctor" ? (
          <Link
            to="/patients"
            className={`${
              this.props.location.pathname === "/patients"
                ? "pink text-white"
                : "pink-text"
            } list-group-item`}
          >
            PATIENTS
          </Link>
        ) : null}

        {usertype === "Admin" || usertype === "Pharmacist" ? (
          <Link
            to="/drugs"
            className={`${
              this.props.location.pathname === "/drugs"
                ? "pink text-white"
                : "pink-text"
            } list-group-item`}
          >
            DRUGS
          </Link>
        ) : null}

        {usertype === "Admin" ||
        usertype === "Doctor" ||
        usertype === "Patient" ||
        usertype === "Pharmacist" ? (
          <Link
            to="/prescriptions"
            className={`${
              this.props.location.pathname === "/prescriptions" ||
              this.props.match.path === "/prescription/:id"
                ? "pink text-white"
                : "pink-text"
            } list-group-item`}
          >
            PRESCRIPTIONS
          </Link>
        ) : null}

        <Link
          to="/changepassword"
          className={`${
            this.props.location.pathname === "/changepassword"
              ? "pink text-white"
              : "pink-text"
          } list-group-item `}
        >
          CHANGE PASSWORD
        </Link>
      </ul>
    );
  }
}

Modules.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Modules));
