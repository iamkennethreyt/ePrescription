import React, { Component } from "react";
import Modules from "../layout/Modules";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDrug, getDrugs } from "../../actions/drugActions";
import Switch from "@material-ui/core/Switch";
import Spinner from "../common/Spinner";
import AddDrug from "./AddDrug";
import Axios from "axios";

class Drug extends Component {
  state = {
    displayForm: false
  };
  componentDidMount() {
    const { usertype } = this.props.auth.user;
    this.props.getDrugs();
    if (
      usertype === "Patient" ||
      usertype === "Secretary" ||
      usertype === "Doctor"
    ) {
      this.props.history.push("/");
    }
  }
  render() {
    const { loading, drugs } = this.props.drugs;
    let listofdrugs;
    if (drugs === null || loading || drugs === undefined) {
      listofdrugs = <Spinner />;
    } else {
      listofdrugs = (
        <table className="table table-responsive text-nowrap">
          <thead className="pink white-text">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Generic Name</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Dosage</th>
              <th scope="col">Status</th>
              <th scope="col">Dosage Strength</th>
              <th scope="col">Storage</th>
              <th scope="col">Indications</th>
              <th scope="col">Adverse Reaction</th>
              <th scope="col">Contraindications</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{drug.drug}</td>
                  <td>{drug.brand}</td>
                  <td>{drug.dosage}</td>
                  <td>
                    {this.props.auth.user.usertype === "Admin" ||
                    this.props.auth.user.usertype === "Pharmacist" ? (
                      <Switch
                        type="checkbox"
                        onClick={e => {
                          Axios.put(`/api/drugs/changestatus/${drug._id}`, {
                            status: e.target.checked
                          });
                        }}
                        defaultChecked={drug.status}
                      />
                    ) : (
                      drug.status
                    )}
                  </td>
                  <td>{`${drug.quantity} ${drug.unit}`}</td>
                  <td>{drug.storage}</td>
                  <td>{drug.indicator}</td>
                  <td>{drug.adversereaction}</td>
                  <td>{drug.contraindications}</td>
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
          {this.state.displayForm ? <AddDrug /> : null}

          <div className="d-flex justify-content-between">
            <h1>Drug Management</h1>
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
          </div>

          {listofdrugs}
        </div>
      </div>
    );
  }
}

Drug.propTypes = {
  getDrugs: PropTypes.func.isRequired,
  drugs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  drugs: state.drugs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addDrug, getDrugs }
)(Drug);
