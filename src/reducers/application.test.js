import applicationReducer from './Application';
import * as ApplicationActions from '../actions/Application';
import * as EditorActions from '../actions/Editor';

describe('applicationReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = applicationReducer(undefined, {type: '__UNKNOWN',});
    expect(state).toEqual({
      roomName: null,
      editorMode: 'code',
      listOfUsers: [],
      listOfUserVideos: [],
    });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = applicationReducer(currentState, {type: '__UNKNOWN',});
    expect(state).toBe(currentState);
  });

  describe('setCreateInput', () => {
    it('Should add input as room name', () => {
      const input1 = 'rrb';
      const input2 = 'bestRoomName';
      let state;

      state = applicationReducer(state, ApplicationActions.setCreateInput(input1));
      expect(state).toEqual({
        roomName: input1,
        editorMode: 'code',
        listOfUsers: [],
        listOfUserVideos: [],
      });
      state = applicationReducer(state, ApplicationActions.setCreateInput(input2));
      expect(state).toEqual({
        roomName: input2,
        editorMode: 'code',
        listOfUsers: [],
        listOfUserVideos: [],
      });
    });
  });

  describe('setEditorView', () => {
    it('Should default to code', () => {
      let state;
      state = applicationReducer(state, {type: '__UNKNOWN',});
      expect(state.editorMode).toEqual('code');
    });
    it('Should set correct editor mode', () => {
      let state;
      const docMode = 'Doc View';
      const whiteboardMode = 'Whiteboard View';

      state = applicationReducer(state, EditorActions.setEditorView(docMode));
      expect(state.editorMode).toEqual(docMode);
      state = applicationReducer(state, EditorActions.setEditorView(whiteboardMode));
      expect(state.editorMode).toEqual(whiteboardMode);
    });
  });
});
