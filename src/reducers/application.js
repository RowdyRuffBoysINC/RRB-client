import {
  SET_CREATE_INPUT
} from '../actions/application';

const initialState = {
  roomName: null,
  editorMode: 'code'
};

export const applicationReducer = function(state=initialState, action) {
  
  switch (action.type) {
    case SET_CREATE_INPUT: 
      return { ...state, roomName: action.data };
  
    default: return state;

  }
};

export default applicationReducer;



