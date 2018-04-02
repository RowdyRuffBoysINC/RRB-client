import * as ApplicationActions from '../actions/application';
import * as EditorActions from '../actions/editor';

const initialState = {
  roomName: null,
  editorMode: 'code',
  listOfUsers: [],
  listOfUserVideos: [],

};

export const applicationReducer = function (state = initialState, action) {
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
    console.log(action.data);
    return {
      ...state,
      listOfUsers: state.listOfUsers.filter(user => user.id !== action.data),
    };
  default: 
    return state;
  }
};

export default applicationReducer;
