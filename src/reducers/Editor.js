import * as EditorActions from '../actions/Editor';

const initialState = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'material',
  tabSize: 2,
  codeEditorText: '',
  wordEditorText: '',
  whiteBoardEditorValue: '',
};

const cmReducer = function (state = initialState, action) {
  switch (action.type) {
  case EditorActions.SET_THEME:
    return {
      ...state,
      theme: action.theme,
    };
  case EditorActions.SET_MODE:
    return {
      ...state,
      mode: action.mode,
    };
  case EditorActions.SET_TAB_SIZE:
    return {
      ...state,
      tabSize: action.tabSize,
    };
  case EditorActions.SET_LINE_NUMBERS:
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
