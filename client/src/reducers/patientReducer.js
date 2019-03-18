import { LOADING_PATIENTS, GET_PATIENTS, ADD_PATIENT } from "../actions/types";

const initialState = {
  loading: false,
  patient: {},
  patients: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case GET_PATIENTS:
      return {
        ...state,
        loading: false,
        patients: action.payload
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [action.payload, ...state.patients],
        loading: false
      };
    default:
      return state;
  }
}
