import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

import {
  changePasswordPatient,
  changePasswordUser
} from "../../actions/authActions";

// import AddPrescription from "./AddPrescription";

class ChangePassword extends Component {
  state = {
    password: "",
    password2: "",
    password3: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      id: this.props.auth.user.id,
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };

    // return this.props.changePasswordPatient(userData, this.props.history);

    if (this.props.auth.user.usertype === "Patient") {
      return this.props.changePasswordPatient(userData, this.props.history);
    } else {
      return this.props.changePasswordUser(userData, this.props.history);
    }
  };

  render() {
    console.log(this.props.auth.user.usertype);
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-4">
          <Modules />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">Change Password</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Previous Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="New Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password3"
                  type="password"
                  value={this.state.password3}
                  onChange={this.onChange}
                  error={errors.password3}
                />
                <input type="submit" className="btn pink btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePasswordPatient: PropTypes.func.isRequired,
  changePasswordUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { changePasswordPatient, changePasswordUser }
)(withRouter(ChangePassword));
