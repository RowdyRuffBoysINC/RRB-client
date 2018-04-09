import {
  UPDATE_CHAT_LOG,
  UPDATE_MESSAGE_DRAFT,
  TOGGLE_CHAT_VIEW,
} from './../actions/Chat';
const initialState = {
  chatLogs: [],
  messageDraft: {
    username: '',
    msg: '',
  },
  isChatViewEnabled: true,
};

const chatReducer = function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_CHAT_LOG:
    return {
      ...state,
      chatLogs: [
        ...state.chatLogs,
        action.data,
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
      messageDraft: {
        username: action.username,
        msg: action.message,
      },
    };
  default:
    return state;
  }
};

export default chatReducer;
