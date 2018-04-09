import * as ApplicationActions from '../actions/Application';
import * as EditorActions from '../actions/Editor';

const initialState = {
  roomName: null,
  editorMode: 'code',
  listOfUsers: [],
  enableAudio: false,
  enableVideo: true,
  localVideoStream: null,
  remoteVideoStreams: [],
  createVideoFunc: null,
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
  case ApplicationActions.SET_CREATE_VIDEO_FUNC:

    return {
      ...state,
      createVideoFunc: action.data,
    };
  case ApplicationActions.TOGGLE_WEBCAM_AUDIO:
    return {
      ...state,
      enableAudio: !state.enableAudio,
    };
  case ApplicationActions.TOGGLE_WEBCAM_VIDEO:
    return {
      ...state,
      enableVideo: !state.enableVideo,
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
  case ApplicationActions.DELETE_LOCAL_USER_STREAM:

    state.localVideoStream.getTracks().forEach(track => track.stop());

    return {
      ...state,
      localVideoStream: null,
    };
  case ApplicationActions.SET_REMOTE_USER_STREAM: {
    if (state.remoteVideoStreams.length === 0) {
      return {
        ...state,
        remoteVideoStreams: [ ...state.remoteVideoStreams, { id: action.data.id, stream: action.data.stream, }, ],
      };
    }

    const foundUser = state.remoteVideoStreams.find(video => video.id === action.data.id);

    if (foundUser)
      return state;
    else
      return {
        ...state,
        remoteVideoStreams: [ ...state.remoteVideoStreams, { id: action.data.id, stream: action.data.stream, }, ],
      };
  }
  case ApplicationActions.DELETE_REMOTE_USER_STREAM:
    return {
      ...state,
      remoteVideoStreams: state.remoteVideoStreams.filter((video) => {
        if (video.id === action.data) {
          video.stream.getTracks().forEach(track => track.stop());
          video.stream = null;
          return false;
        }

        return true;
      }),
    };
  default:
    return state;
  }
};

export default applicationReducer;
