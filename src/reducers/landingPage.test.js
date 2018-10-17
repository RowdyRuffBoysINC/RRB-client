import landingPageReducer from './LandingPage';
import * as LandingPageActions from '../actions/Users';

describe('landingPageReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = landingPageReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({ showLoginForm: false });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = landingPageReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('showLoginForm', () => {
    it('Should set showLoginForm to true', () => {
      let state;
      state = landingPageReducer(state, LandingPageActions.showLoginForm());
      expect(state.showLoginForm).toEqual(true);
    });
  });

  describe('hideLoginForm', () => {
    it('Should set showLoginForm to false', () => {
      let state;
      state = landingPageReducer(state, LandingPageActions.hideLoginForm());
      expect(state.showLoginForm).toEqual(false);
    });
  });
});
