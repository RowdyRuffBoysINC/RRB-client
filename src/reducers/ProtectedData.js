import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
} from '../actions/ProtectedData';

const initialState = {
  data: '',
  error: null,
};

const protectedDataReducer = function (state = initialState, action) {
  switch(action.type) {
  case FETCH_PROTECTED_DATA_SUCCESS:
    return {
      ...state,
      data: action.data,
      error: null,
    };
  case FETCH_PROTECTED_DATA_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default protectedDataReducer;
