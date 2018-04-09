export const TOGGLE_CHAT_VIEW = 'TOGGLE_CHAT_VIEW';
export const toggleChatView = () => ({ type: TOGGLE_CHAT_VIEW, });

export const UPDATE_CHAT_LOG = 'UPDATE_CHAT_LOG';
export const updateChatLog = data => ({
  type: UPDATE_CHAT_LOG,
  data,
});

export const UPDATE_MESSAGE_DRAFT = 'UPDATE_MESSAGE_DRAFT';
export const updateMessageDraft = data => ({
  type: UPDATE_MESSAGE_DRAFT,
  username: data.username,
  message: data.message,
});
