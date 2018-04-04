import authReducer from './Auth';
import * as AuthActions from '../actions/Auth';

const initialState = {
  authToken: null, // AuthToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null,
};

describe('authReducer', () => {

});
