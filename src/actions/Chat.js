export const TOGGLE_CHAT_VIEW = 'TOGGLE_CHAT_VIEW';
export const toggleChatView = () => ({ type: TOGGLE_CHAT_VIEW, });

export const UPDATE_CHAT_LOG = 'UPDATE_CHAT_LOG';
export const updateChatLog = message => ({
  type: UPDATE_CHAT_LOG,
  message,
});

export const UPDATE_MESSAGE_DRAFT = 'UPDATE_MESSAGE_DRAFT';
export const updateMessageDraft = message => ({
  type: UPDATE_MESSAGE_DRAFT,
  message,
});
