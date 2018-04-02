import {
  SET_CREATE_INPUT,
} from '../actions/application';

import {
  SET_EDITOR_VIEW,
} from '../actions/editor';

const initialState = {
  roomName: null,
  editorMode: 'code',
};

export const applicationReducer = function (state = initialState, action) {
  switch (action.type) {
  case SET_CREATE_INPUT:
    return {
      ...state,
      roomName: action.data,
    };
  case SET_EDITOR_VIEW:
    return {
      ...state,
      editorMode: action.mode,
    };
  default: return state;
  }
};

export default applicationReducer;
