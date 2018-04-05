import landingPageReducer from './LandingPage';
import * as LandingPageActions from '../actions/Users';

describe('landingPageReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = landingPageReducer(undefined, {type: '__UNKNOWN',});
    expect(state).toEqual({ showLoginForm: false, });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = landingPageReducer(currentState, {type: '__UNKNOWN',});
    expect(state).toBe(currentState);
  });

})