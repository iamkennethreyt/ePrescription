import {
  LOADING_PRESCRIPTIONS,
  GET_PRESCRIPTIONS,
  ADD_PRESCRIPTION,
  GET_PRESCRIPTION
} from "../actions/types";

const initialState = {
  loading: false,
  prescription: {},
  prescriptions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRESCRIPTIONS:
      return {
        ...state,
        loading: true
      };
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        loading: false,
        prescriptions: action.payload
      };
    case GET_PRESCRIPTION:
      return {
        ...state,
        loading: false,
        prescription: action.payload
      };
    case ADD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [action.payload, ...state.prescriptions],
        loading: false
      };
    default:
      return state;
  }
}
