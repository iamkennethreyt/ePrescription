import axios from "axios";

import {
  LOADING_PATIENTS,
  GET_ERRORS,
  GET_PATIENTS,
  ADD_PATIENT
} from "./types";

export const addPatient = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/patients/", newData)
    .then(res => {
      dispatch(setLoading());
      dispatch({
        type: ADD_PATIENT,
        payload: res.data
      });
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPatients = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/patients/`)
    .then(res =>
      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: {},
        payload: {}
      })
    );
};

export const setLoading = () => {
  return {
    type: LOADING_PATIENTS
  };
};
