import { createStore, applyMiddleware, combineReducers, } from 'redux';
import { composeWithDevTools, } from 'redux-devtools-extension';
import { reducer as formReducer, } from 'redux-form';
import thunk from 'redux-thunk';

import { loadAuthToken, } from './local-storage';
import authReducer from './reducers/Auth';
import applicationReducer from './reducers/Application';
import editorReducer from './reducers/Editor';
import landingPageReducer from './reducers/LandingPage';
import { setAuthToken, refreshAuthToken, } from './actions/Auth';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    editorReducer,
    landingPageReducer,
    applicationReducer,
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
