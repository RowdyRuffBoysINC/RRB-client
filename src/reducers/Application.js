import * as ApplicationActions from '../actions/Application';
import * as EditorActions from '../actions/Editor';

const initialState = {
  roomName: null,
  editorMode: 'code',
  listOfUsers: [],
  localVideoStream: null,
  remoteVideoStreams: {},
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
  case ApplicationActions.SET_LOCAL_USER_STREAM:
    return {
      ...state,
      localVideoStream: action.data,
    };
  case ApplicationActions.SET_REMOTE_USER_STREAM:
    return {
      ...state,
      remoteVideoStreams: {
        ...state.remoteVideoStreams,
        [`${action.data.socket}`]: action.data.stream,
      },
    };
  case ApplicationActions.DELETE_LOCAL_USER_STREAM:
    return {
      ...state,
      localVideoStream: null,
    };
  case ApplicationActions.DELETE_REMOTE_USER_STREAM: {

    console.log('OLD OBJ:', state);

    const { remoteVideoStreams: { [action.data.input]: r, ...remoteVideoStreams }, } = state;
    
    console.log('NEW DELETED OBJ:', {
      ...state,
      remoteVideoStreams,
    });

    return {
      ...state,
      remoteVideoStreams,
    };
  }
  default:
    return state;
  }
};

export default applicationReducer;
