/* This actions file handles actions specific to the EditorView component and it's child components: FirepadCodeEditor, FirepadWordEditor, & WhiteBoardEditor */

//Actions that handle state change for Editor View Component
export const SET_EDITOR_VIEW = 'SET_EDITOR_VIEW';
export const setEditorView = mode => ({
  type: SET_EDITOR_VIEW,
  mode,
});

//Actions that handle state change for Code View Component
export const SET_THEME = 'SET_THEME';
export const setTheme = theme => ({
  type: SET_THEME,
  theme,
});

export const SET_MODE = 'SET_MODE';
export const setMode = mode => ({
  type: SET_MODE,
  mode,
});

export const SET_TAB_SIZE = 'SET_TAB_SIZE';
export const setTabSize = tabSize => ({
  type: SET_TAB_SIZE,
  tabSize,
});

export const SET_LINE_NUMBERS = 'SET_LINE_NUMBERS';
export const setLineNumbers = setting => ({
  type: SET_LINE_NUMBERS,
  setting,
});

export const SET_WHITEBOARD_EDITOR_VALUE = 'SET_WHITEBOARD_EDITOR_VALUE';
export const setWhiteBoardEditorValue = input => ({
  type: SET_WHITEBOARD_EDITOR_VALUE,
  input,
});

export const SET_WHITEBOARD_EDITOR_COLOR = 'SET_WHITEBOARD_EDITOR_COLOR';
export const setWhiteBoardEditorColor = input => ({
  type: SET_WHITEBOARD_EDITOR_COLOR,
  input,
});

export const SET_WHITEBOARD_EDITOR_BRUSH_SIZE = 'SET_WHITEBOARD_EDITOR_BRUSH_SIZE';
export const setWhiteBoardEditorBrushSize = input => ({
  type: SET_WHITEBOARD_EDITOR_BRUSH_SIZE,
  input,
});

export const SET_CONSOLE_LOG_MSG = 'SET_CONSOLE_LOG_MSG';
export const setConsoleLogMsg = input => ({
  type: SET_CONSOLE_LOG_MSG,
  input,
});

export const CLEAR_CONSOLE_LOG_MSG = 'CLEAR_CONSOLE_LOG_MSG';
export const clearConsoleLogMsg = input => ({
  type: CLEAR_CONSOLE_LOG_MSG,
  input,
});
