import axios from "axios";

import {
  LOADING_PRESCRIPTIONS,
  ADD_PRESCRIPTION,
  GET_PRESCRIPTIONS,
  GET_ERRORS,
  GET_PRESCRIPTION,
  ADD_DRUG_PRESCRIPTION,
  DELETE_DRUG_PRESCRIPTION
} from "./types";

export const addPrescription = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/prescriptions/", newData)
    .then(res => {
      dispatch(setLoading());
      dispatch({
        type: ADD_PRESCRIPTION,
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

//Get users
export const getPrescriptions = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/prescriptions/`)
    .then(res =>
      dispatch({
        type: GET_PRESCRIPTIONS,
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

//Get users
export const getPrescription = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/prescriptions/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRESCRIPTION,
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

export const addDrugPrescription = (id, data, onSuccess) => dispatch => {
  console.log(data);
  axios
    .post(`/api/prescriptions/${id}`, data)
    .then(res => {
      dispatch({
        type: ADD_DRUG_PRESCRIPTION,
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

export const removeDrugPrescription = (id, data) => dispatch => {
  axios
    .put(`/api/prescriptions/${id}`, data)
    .then(res =>
      dispatch({
        type: DELETE_DRUG_PRESCRIPTION,
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

// User loading
export const setLoading = () => {
  return {
    type: LOADING_PRESCRIPTIONS
  };
};
