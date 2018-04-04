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

const editorReducer = function (state = initialState, action) {
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
  case EditorActions.SET_CODE_EDITOR_TEXT:
    return {
      ...state,
      codeEditorText: action.input,
    };
  default: return state;
  }
};

export default editorReducer;
