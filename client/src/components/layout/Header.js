import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <title>
          {`ePrescription | ${this.props.auth.user.firstname} ${
            this.props.auth.user.lastname
          }`}
        </title>

        <nav
          className="navbar navbar-expand-lg navbar-dark pink"
          style={{ marginBottom: 100 }}
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              ePrescription
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#basicExampleNav"
              aria-controls="basicExampleNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {this.props.auth.isAuthenticated ? (
              <div className="collapse navbar-collapse" id="basicExampleNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.auth.user.usertype +
                        " | " +
                        this.props.auth.user.firstname +
                        " " +
                        this.props.auth.user.lastname}
                    </a>
                    <div
                      className="dropdown-menu dropdown-primary"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to logout?")
                          ) {
                            this.props.logoutUser();
                          }
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
