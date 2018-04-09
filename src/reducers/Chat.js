import {
  UPDATE_CHAT_LOG,
  UPDATE_MESSAGE_DRAFT,
  SHOW_CHAT_VIEW,
  SHOW_USER_VIEW,
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
  case SHOW_CHAT_VIEW:
    return {
      ...state,
      isChatViewEnabled: true,
    };
  case SHOW_USER_VIEW:
    return {
      ...state,
      isChatViewEnabled: false,
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
