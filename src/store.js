import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { reducer as burgerMenu } from 'redux-burger-menu';
import thunk from 'redux-thunk';

import { loadAuthToken } from './local-storage';
import authReducer from './reducers/Auth';
import applicationReducer from './reducers/Application';
import editorReducer from './reducers/Editor';
import landingPageReducer from './reducers/LandingPage';
import { setAuthToken, refreshAuthToken } from './actions/Auth';
import chatReducer from './reducers/Chat';
// Fix: use same naming conventions for reducers.
const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    chat: chatReducer,
    editorReducer,
    landingPageReducer,
    applicationReducer,
    burgerMenu,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
