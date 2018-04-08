import {
  UPDATE_CHAT_LOG,
  TOGGLE_CHAT_VIEW,
} from './../actions/Chat';
const initialState = {
  chatLogs: [],
  isChatViewEnabled: true,
};

const chatReducer = function (state = initialState, action) {
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
  default:
    return state;
  }
};

export default chatReducer;
