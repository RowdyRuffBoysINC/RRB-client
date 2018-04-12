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
  whiteBoardEditorBrushSize: 2,
  consoleLogMessages: [],
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
      whiteBoardEditorBrushSize: Math.min(Math.max(2, action.input), 75),
    };
  case EditorActions.SET_WHITEBOARD_EDITOR_COLOR:
    return {
      ...state,
      whiteBoardEditorColor: action.input,
    };
  case EditorActions.SET_CONSOLE_LOG_MSG:
    console.log('EditorActions -> SET_CONSOLE -> input: ', action.input);
    console.log('consolelog', state.consoleLogMessages);

    return {
      ...state,
      consoleLogMessages: [ ...state.consoleLogMessages, action.input, ],
    };
  default: return state;
  }
};

export default editorReducer;
