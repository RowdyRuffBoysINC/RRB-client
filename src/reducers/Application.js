import * as ApplicationActions from '../actions/Application';
import * as EditorActions from '../actions/Editor';

const initialState = {
  roomName: null,
  editorMode: 'code',
  listOfUsers: [],
  // Check with Abe to see if he needs this unused property.
  listOfUserVideos: [],
};

const applicationReducer = function (state = initialState, action) {
  switch (action.type) {
  case ApplicationActions.SET_CREATE_INPUT:
    return {
      ...state,
      roomName: action.data,
    };
  case EditorActions.SET_EDITOR_VIEW:
    return {
      ...state,
      editorMode: action.mode,
    };
  case ApplicationActions.SET_USER_LIST:
    return {
      ...state,
      listOfUsers: action.data,
    };
  case ApplicationActions.DELETE_USER_FROM_LIST:
    return {
      ...state,
      listOfUsers: state.listOfUsers.filter(user => user.id !== action.data),
    };
  default:
    return state;
  }
};

export default applicationReducer;
