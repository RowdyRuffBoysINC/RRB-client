import * as EditorActions from '../actions/Editor';

const initialState = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'material',
  tabSize: 2,
  whiteBoardEditorValue: null,
  loading: false,
  error: null,
  whiteBoardEditorColor: 'black',
  whiteBoardEditorBrushSize: 6,
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
    // Change to toggle instead of if else?
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
  case EditorActions.SET_WHITEBOARD_EDITOR_VALUE:
    return {
      ...state,
      whiteBoardEditorValue: action.input,
    };
  case EditorActions.SET_WHITEBOARD_EDITOR_BRUSH_SIZE:
    return {
      ...state,
      whiteBoardEditorBrushSize: action.input,
    };
  case EditorActions.SET_WHITEBOARD_EDITOR_COLOR:
    return {
      ...state,
      whiteBoardEditorColor: action.input,
    };
  default: return state;
  }
};

export default editorReducer;
