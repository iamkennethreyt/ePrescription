import axios from "axios";

import { ADD_USER, GET_USERS, LOADING_USERS, GET_ERRORS } from "./types";

// Add User
export const addUser = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/users/", newData)
    .then(res => {
      dispatch(setLoading());
      dispatch({
        type: ADD_USER,
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
export const getUsers = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/users/`)
    .then(res =>
      dispatch({
        type: GET_USERS,
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
    type: LOADING_USERS
  };
};
