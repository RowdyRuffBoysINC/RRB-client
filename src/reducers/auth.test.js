import authReducer from './Auth';
import * as AuthActions from '../actions/Auth';

describe('authReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = authReducer(undefined, { type: '__UNKNOWN', });
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null,
    });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = authReducer(currentState, { type: '__UNKNOWN', });
    expect(state).toBe(currentState);
  });

  describe('setAuthToken', () => {
    it('Should set auth token', () => {
      let state;
      const token = 'token123';
      state = authReducer(state, AuthActions.setAuthToken(token));
      expect(state.authToken).toEqual(token);
    });
  });

  describe('clearAuth', () => {
    it('Should clear current auth token', () => {
      let state;
      const token = 'token123';
      state = authReducer(state, AuthActions.setAuthToken(token));
      expect(state.authToken).toEqual(token);
      state = authReducer(state, AuthActions.clearAuth());
      expect(state.authToken).toEqual(null);
    });
  });

  describe('authRequest', () => {
    it('Should start auth request', () => {
      let state;
      state = authReducer(state, AuthActions.authRequest());
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('authSuccess', () => {
    it('Should get current user on success', () => {
      let state;
      const user = 'David';
      state = authReducer(state, AuthActions.authSuccess(user));
      expect(state.loading).toEqual(false);
      expect(state.currentUser).toEqual(user);
    });
  });

  describe('authError', () => {
    it('Should return auth error', () => {
      let state;
      const error = 'Something went wrong!';
      state = authReducer(state, AuthActions.authError(error));
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(error);
    });
  });
});
