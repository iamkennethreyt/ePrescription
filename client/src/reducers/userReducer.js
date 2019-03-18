import { LOADING_USERS, GET_USERS, ADD_USER } from "../actions/types";

const initialState = {
  loading: false,
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false
      };
    default:
      return state;
  }
}
