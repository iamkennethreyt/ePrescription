import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/userActions";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class AddUser extends Component {
  state = {
    userid: "",
    usertype: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      userid: this.state.userid,
      usertype: this.state.usertype,
      phonenumber: this.state.phonenumber
    };

    this.props.addUser(newData, this.onSuccess);
  };

  onSuccess = () => {
    this.setState({
      userid: "",
      usertype: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      errors: {}
    });
    alert("Successfully added new user");
  };

  render() {
    const { errors } = this.state;
    const options = [
      { label: "* Select User Type", value: 0 },
      { label: "Admin", value: "Admin" },
      { label: "Doctor", value: "Doctor" },
      { label: "Secretary", value: "Secretary" },
      { label: "Pharmacist", value: "Pharmacist" }
    ];
    return (
      <form className="border border-light p-5" onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="First Name"
          name="firstname"
          value={this.state.firstname}
          onChange={this.onChange}
          error={errors.firstname}
        />
        <TextFieldGroup
          placeholder="Last Name"
          name="lastname"
          value={this.state.lastname}
          onChange={this.onChange}
          error={errors.lastname}
        />

        <TextFieldGroup
          placeholder="User ID /Name"
          name="userid"
          value={this.state.userid}
          onChange={this.onChange}
          error={errors.userid}
          info="this will be the login user and also the password"
        />

        <TextFieldGroup
          placeholder="Contact Number"
          name="phonenumber"
          value={this.state.phonenumber}
          onChange={this.onChange}
          error={errors.phonenumber}
        />

        <SelectListGroup
          placeholder="User Type"
          name="usertype"
          value={this.state.usertype}
          onChange={this.onChange}
          options={options}
          error={errors.usertype}
        />
        <button className="btn pink btn-block mt-4" type="submit">
          Save
        </button>
      </form>
    );
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUser }
)(AddUser);
