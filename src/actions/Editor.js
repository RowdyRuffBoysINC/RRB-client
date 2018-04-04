/* This actions file handles actions specific to the EditorView component and it's child components: CodeEditor, WordEditor, & WhiteBoardEditor */

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

export const SET_CODE_EDITOR_TEXT = 'SET_CODE_EDITOR_TEXT';
export const setCodeEditorText = input => ({
  type: SET_CODE_EDITOR_TEXT,
  input,
});

export const SET_WORD_EDITOR_TEXT = 'SET_WORD_EDITOR_TEXT';
export const setWordEditorText = input => ({
  type: SET_WORD_EDITOR_TEXT,
  input,
});

export const SET_WHITEBOARD_EDITOR_VALUE = 'SET_WHITEBOARD_EDITOR_VALUE';
export const setWhiteBoardEditorValue = input => ({
  type: SET_WHITEBOARD_EDITOR_VALUE,
  input,
});

