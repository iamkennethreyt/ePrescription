import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import User from "./components/user/User";
import Prescription from "./components/prescription/Prescription";
import Drug from "./components/drug/Drug";
import Patient from "./components/patient/Patient";
import DrugPrescription from "./components/drugprescription/DrugPrescription";
import LoginPatient from "./components/auth/LoginPatient";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/loginpatient" component={LoginPatient} />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/users" component={User} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/patients" component={Patient} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/prescriptions"
                  component={Prescription}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/prescription/:id"
                  component={DrugPrescription}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/drugs" component={Drug} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
