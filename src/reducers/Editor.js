import {
  SET_TAB_SIZE,
  SET_LINE_NUMBERS,
  SET_THEME,
  SET_MODE,
} from '../actions/Editor';

const initialState = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'material',
  tabSize: 2,
};

const cmReducer = function (state = initialState, action) {
  switch (action.type) {
  case SET_THEME:
    return {
      ...state,
      theme: action.theme,
    };
  case SET_MODE:
    return {
      ...state,
      mode: action.mode,
    };
  case SET_TAB_SIZE:
    return {
      ...state,
      tabSize: action.tabSize,
    };
  case SET_LINE_NUMBERS:
    if (action.setting === 'false') {
      return {
        ...state,
        lineNumbers: false,
      };
    }
    else return {
      ...state,
      lineNumbers: true,
    };
  default: return state;
  }
};

export default cmReducer;
