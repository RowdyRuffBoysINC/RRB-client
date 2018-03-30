import {
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM
} from '../actions/users';

const initialState = {
  showLoginForm: false,
};

export function landingPageReducer(state=initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
    console.log(action.type);
    return {
      ...state,
      showLoginForm: true,
    }
    case HIDE_LOGIN_FORM:
    return {
      ...state,
      showLoginForm: false,
    }
    default: return state;
  }
}

export default landingPageReducer;