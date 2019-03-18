import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import patientReducer from "./patientReducer";
import prescriptionReducer from "./prescriptionReducer";
import drugReducer from "./drugReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer,
  patients: patientReducer,
  prescriptions: prescriptionReducer,
  drugs: drugReducer
});
