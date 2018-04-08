export const TOGGLE_CHAT_VIEW = 'TOGGLE_CHAT_VIEW';
export const toggleChatView = () => ({ type: TOGGLE_CHAT_VIEW, });

export const UPDATE_CHAT_LOG = 'UPDATE_CHAT_LOG';
export const updateChatLog = message => ({
  type: UPDATE_CHAT_LOG,
  message,
});
