import { EditorState, convertFromRaw, } from 'draft-js';
import * as EditorActions from '../actions/Editor';

const defaultWordEditorContent = { entityMap: {}, blocks: [ { key: '637gr', text: '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}, }, ], };

const initialState = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'material',
  tabSize: 2,
  codeEditorText: '',
  wordEditorText: EditorState.createWithContent(convertFromRaw(defaultWordEditorContent)),
  whiteBoardEditorValue: null,
  loading: false,
  error: null,
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
  case EditorActions.SET_WORD_EDITOR_TEXT:
    return {
      ...state,
      wordEditorText: action.input,
    };
  case EditorActions.SET_WHITEBOARD_EDITOR_VALUE:
    return {
      ...state,
      whiteBoardEditorValue: action.input,
    };
  case EditorActions.UPDATE_DOCS_DB_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case EditorActions.UPDATE_DOCS_DB_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case EditorActions.UPDATE_DOCS_DB_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case EditorActions.FETCH_DOCS_FROM_DB_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case EditorActions.FETCH_DOCS_FROM_DB_SUCCESS:
    action.wordEditorText.entityMap = {};
    return {
      ...state,
      loading: false,
      codeEditorText: action.codeEditorText,
      wordEditorText: EditorState.createWithContent(convertFromRaw(action.wordEditorText)),
      whiteBoardEditorValue: action.whiteBoardEditorValue,
    };
  case EditorActions.FETCH_DOCS_FROM_DB_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case EditorActions.CREATE_DOCS_DB_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case EditorActions.CREATE_DOCS_DB_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case EditorActions.CREATE_DOCS_DB_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default: return state;
  }
};

export default editorReducer;
