import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser, getUsers } from "../../actions/userActions";

import Spinner from "../common/Spinner";
import AddUser from "./AddUser";

class User extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    this.props.getUsers();
    if (this.props.auth.user.usertype === "Patient") {
      this.props.history.push("/");
    }
  }
  render() {
    const { loading, users } = this.props.users;
    let listofusers;
    if (users === null || loading || users === undefined) {
      listofusers = <Spinner />;
    } else {
      listofusers = (
        <table className="table">
          <thead className="pink white-text">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Type</th>
              <th scope="col">User ID</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.firstname + " " + user.lastname}</td>
                  <td>{user.usertype}</td>
                  <td>{user.userid}</td>
                  <td>{user.phonenumber}</td>
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
          {this.state.displayForm && <AddUser />}

          <div className="d-flex justify-content-between">
            <h1>User Management</h1>
            {this.props.auth.user.usertype === "Admin" && (
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
            )}
          </div>

          {listofusers}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addUser, getUsers }
)(User);
