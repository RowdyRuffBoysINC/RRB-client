import {
  UPDATE_CHAT_LOG,
  UPDATE_MESSAGE_DRAFT,
  TOGGLE_CHAT_VIEW,
} from './../actions/Chat';
const initialState = {
  chatLogs: [],
  messageDraft: '',
  isChatViewEnabled: true,
};

const chatReducer = function (state = initialState, action) {
  console.log(action, 'THIS IS ACTION FROM REDUCER');
  switch (action.type) {
  case UPDATE_CHAT_LOG:
    return {
      ...state,
      chatLogs: [
        ...state.chatLogs,
        action.message,
      ],
    };
  case TOGGLE_CHAT_VIEW:
    return {
      ...state,
      isChatViewEnabled: !state.isChatViewEnabled,
    };
  case UPDATE_MESSAGE_DRAFT:
    return {
      ...state,
      messageDraft: action.message,
    };
  default:
    return state;
  }
};

export default chatReducer;
