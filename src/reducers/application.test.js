import applicationReducer from './Application';
import * as ApplicationActions from '../actions/Application';
import * as EditorActions from '../actions/Editor';

describe('applicationReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = applicationReducer(undefined, { type: '__UNKNOWN', });
    expect(state).toEqual({
      roomName: null,
      editorMode: 'code',
      listOfUsers: [],
      enableAudio: false,
      enableVideo: true,
      localVideoStream: null,
      remoteVideoStreams: [],
      createVideoFunc: null,
      roomView: 'audio',
    });
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = applicationReducer(currentState, { type: '__UNKNOWN', });
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
        roomView: 'audio',
      });
      state = applicationReducer(state, ApplicationActions.setCreateInput(input2));
      expect(state).toEqual({
        roomName: input2,
        editorMode: 'code',
        listOfUsers: [],
        listOfUserVideos: [],
        roomView: 'audio',
      });
    });
  });

  describe('setEditorView', () => {
    it('Should default to code mode', () => {
      let state;
      state = applicationReducer(state, { type: '__UNKNOWN', });
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

  describe('setUserList', () => {
    it('Should set list of users', () => {
      let state;
      const userList1 = [ 'user1', 'user2', 'user3', ];
      const userList2 = [ 'user4', 'user5', 'user6', ];

      state = applicationReducer(state, ApplicationActions.setUserList(userList1));
      expect(state.listOfUsers).toEqual(userList1);
      state = applicationReducer(state, ApplicationActions.setUserList(userList2));
      expect(state.listOfUsers).toEqual(userList2);
    });
  });

  describe('deleteUserFromList', () => {
    it('Should delete user from list', () => {
      let state;
      const userList1 = [ { id: 'user1', }, { id: 'user2', }, { id: 'user3', }, ];

      state = applicationReducer(state, ApplicationActions.setUserList(userList1));
      expect(state.listOfUsers).toEqual(userList1);
      state = applicationReducer(state, ApplicationActions.deleteUserFromList('user1'));
      expect(state.listOfUsers).toEqual([ { id: 'user2', }, { id: 'user3', }, ]);
    });
  });
});
