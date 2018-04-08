import { UPDATE_CHAT_LOG, } from './../actions/Chat';
const initialState = {
  messageLogs: [],
  messageDraft: '',
};

const chatReducer = function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_CHAT_LOG:
    console.log('Chat wired up!');
    return state;
  default:
    return state;
  }
};

export default chatReducer;
