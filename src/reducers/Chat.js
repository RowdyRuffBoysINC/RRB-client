import { UPDATE_CHAT_LOG, } from './../actions/Chat';
const initialState = {chatLogs: [],};

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
  default:
    return state;
  }
};

export default chatReducer;
