/* This actions file handles actions specific to the EditorView component and it's child components: CodeEditor, WordEditor, & WhiteBoardEditor */
import { API_BASE_URL } from '../config';
import { SubmissionError, } from 'redux-form';

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


export const UPDATE_DOCS_DB_REQUEST = 'UPDATE_DOCS_DB_REQUEST';
export const updateDocsDbRequest = () => ({ type: UPDATE_DOCS_DB_REQUEST, });

export const UPDATE_DOCS_DB_SUCCESS = 'UPDATE_DOCS_DB_SUCCESS';
export const updateDocsDbSuccess = () => ({ type: UPDATE_DOCS_DB_SUCCESS, });

export const UPDATE_DOCS_DB_ERROR = 'UPDATE_DOCS_DB_ERROR';
export const updateDocsDbError = error => ({
  type: UPDATE_DOCS_DB_ERROR,
  error,
});

export const updateDocsDb = doc => async (dispatch) => {
  dispatch(updateDocsDbRequest());
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${doc.roomName}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify(doc),
    })
    dispatch(updateDocsDbSuccess());
    await response.json();
  }
  catch (err) {
    dispatch(updateDocsDbError(err));
    const { reason, message, location, } = err;
    if (reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
      return Promise.reject(
        new SubmissionError({ [location]: message, })
      );
    }
  }
};


export const FETCH_DOCS_FROM_DB_REQUEST = 'FETCH_DOCS_FROM_DB_REQUEST';
export const fetchDocsFromDbRequest = () => ({ type: FETCH_DOCS_FROM_DB_REQUEST, });

export const FETCH_DOCS_FROM_DB_SUCCESS = 'FETCH_DOCS_FROM_DB_SUCCESS';
export const fetchDocsFromDbSuccess = document => ({
  type: FETCH_DOCS_FROM_DB_SUCCESS,
  codeEditorText: document.codeEditorText,
  wordEditorText: document.wordEditorText,
  whiteBoardEditorValue: document.whiteBoardEditorValue,
});

export const FETCH_DOCS_FROM_DB_ERROR = 'FETCH_DOCS_FROM_DB_ERROR';
export const fetchDocsFromDbError = error => ({
  type: FETCH_DOCS_FROM_DB_ERROR,
  error,
});

export const fetchDocsFromDb = roomName => async (dispatch) => {
  dispatch(fetchDocsFromDbRequest());
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${roomName}`);
    const json = await response.json();
    if (json.length === 0) {
      return false;
    }
    await dispatch(fetchDocsFromDbSuccess(json[0]));
    return;
  }
  catch (err) {
    dispatch(fetchDocsFromDbError(err));
    const { reason, message, location, } = err;
    if (reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
      return Promise.reject(
        new SubmissionError({ [location]: message, })
      );
    }
  }
}


export const CREATE_DOCS_DB_REQUEST = 'CREATE_DOCS_DB_REQUEST';
export const createDocsDbRequest = () => ({ type: CREATE_DOCS_DB_REQUEST, });

export const CREATE_DOCS_DB_SUCCESS = 'CREATE_DOCS_DB_SUCCESS';
export const createDocsDbSuccess = () => ({ type: CREATE_DOCS_DB_SUCCESS, });

export const CREATE_DOCS_DB_ERROR = 'CREATE_DOCS_DB_ERROR';
export const createDocsDbError = error => ({
  type: CREATE_DOCS_DB_ERROR,
  error,
});

export const createDocsDb = doc => async (dispatch) => {
  dispatch(createDocsDbRequest());
  try {
    const response = await fetch(`${API_BASE_URL}/documents/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify(doc),
    })
    dispatch(createDocsDbSuccess());
    await response.json();
  }
  catch (err) {
    dispatch(createDocsDbError(err));
    const { reason, message, location, } = err;
    if (reason === 'ValidationError') {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
      return Promise.reject(
        new SubmissionError({ [location]: message, })
      );
    }
  }
};

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
