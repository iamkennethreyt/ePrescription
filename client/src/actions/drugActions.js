import axios from "axios";

import { LOADING_DRUGS, ADD_DRUG, GET_DRUGS, GET_ERRORS } from "./types";

// Add User
export const addDrug = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/drugs/", newData)
    .then(res => {
      dispatch(setLoading());
      dispatch({
        type: ADD_DRUG,
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
export const getDrugs = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/drugs/`)
    .then(res =>
      dispatch({
        type: GET_DRUGS,
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
    type: LOADING_DRUGS
  };
};
