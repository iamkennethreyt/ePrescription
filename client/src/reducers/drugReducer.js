import { LOADING_DRUGS, GET_DRUGS, ADD_DRUG } from "../actions/types";

const initialState = {
  loading: false,
  drug: {},
  drugs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DRUGS:
      return {
        ...state,
        loading: true
      };
    case GET_DRUGS:
      return {
        ...state,
        loading: false,
        drugs: action.payload
      };
    case ADD_DRUG:
      return {
        ...state,
        drugs: [action.payload, ...state.drugs],
        loading: false
      };
    default:
      return state;
  }
}
